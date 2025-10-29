import { Endpoint } from 'payload/config';
import { generateChatResponse, ChatMessage } from './ai-providers';
import { searchKnowledge, indexKnowledge, getCacheStats } from './knowledge-base';

// Caché de respuestas para preguntas frecuentes
const responseCache = new Map<string, { response: string; timestamp: number }>();
const RESPONSE_CACHE_DURATION = 1000 * 60 * 60; // 1 hora

/**
 * Genera un prompt optimizado
 */
function buildPrompt(query: string, context: string, shouldListAll: boolean): ChatMessage[] {
  const instruction = shouldListAll 
    ? 'Lista TODAS las opciones mencionadas en el contexto de forma clara y organizada.'
    : 'Responde de forma breve y precisa basándote en el contexto.';
    
  return [
    {
      role: 'system',
      content: `Eres un asistente de la Universidad Nacional de Ingeniería (UNI) de Nicaragua. Responde de forma amigable y natural. ${instruction}`,
    },
    {
      role: 'user',
      content: `Contexto:\n${context}\n\nPregunta: ${query}`,
    },
  ];
}

/**
 * Detecta si la pregunta requiere listar todas las opciones
 */
function shouldListAll(query: string): boolean {
  const listKeywords = [
    'qué carreras', 'cuáles carreras', 'todas las carreras', 'lista de carreras',
    'qué eventos', 'cuáles eventos', 'todos los eventos',
    'qué recintos', 'cuáles recintos', 'todos los recintos',
    'qué facultades', 'cuáles facultades', 'todas las facultades',
    'qué áreas', 'cuáles áreas', 'todas las áreas',
    'listar', 'mostrar todas', 'cuántas',
  ];
  
  const queryLower = query.toLowerCase();
  return listKeywords.some(keyword => queryLower.includes(keyword));
}

const ChatbotEndpoint: Endpoint = {
  path: '/chatbot',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { pregunta, message } = req.body;
      const query = (pregunta || message || '').trim();

      // Validación
      if (!query || query.length < 3) {
        return res.status(400).json({
          error: 'Por favor proporciona una pregunta válida',
        });
      }

      if (query.length > 500) {
        return res.status(400).json({
          error: 'La pregunta es demasiado larga. Máximo 500 caracteres.',
        });
      }

      // Verificar caché de respuestas
      const cacheKey = query.toLowerCase();
      const cached = responseCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < RESPONSE_CACHE_DURATION) {
        console.log('[Chatbot] Respuesta desde caché');
        return res.json({
          response: cached.response,
          fromCache: true,
          provider: 'cache',
        });
      }

      // Asegurar que la base de conocimiento esté indexada
      await indexKnowledge(req.payload);

      // Detectar si debe listar todo
      const needsFullList = shouldListAll(query);
      
      // Buscar información relevante (más resultados si necesita listar todo)
      const limit = needsFullList ? 50 : 5;
      const relevantDocs = searchKnowledge(query, limit);

      let response: string;
      let provider: string;
      let tokensUsed: number | undefined;

      if (relevantDocs.length === 0) {
        // Sin información relevante - respuesta genérica
        response = 'Lo siento, no encontré información específica sobre eso en nuestra base de datos. ¿Podrías reformular tu pregunta o preguntar sobre noticias, eventos, carreras, recintos o contacto de la UNI?';
        provider = 'none';
      } else {
        // Construir contexto (más extenso si necesita listar todo)
        const contextLength = needsFullList ? 150 : 200;
        const context = relevantDocs
          .map((doc, i) => `${i + 1}. ${doc.title}: ${doc.content.substring(0, contextLength)}`)
          .join('\n');

        // Generar respuesta con IA
        const messages = buildPrompt(query, context, needsFullList);
        const aiResponse = await generateChatResponse(messages);

        response = aiResponse.content;
        provider = aiResponse.provider;
        tokensUsed = aiResponse.tokensUsed;

        // Guardar en caché
        responseCache.set(cacheKey, {
          response,
          timestamp: Date.now(),
        });
        
        console.log(`[Chatbot] Respuesta guardada en caché. Tamaño del caché: ${responseCache.size}`);

        // Limpiar caché viejo (mantener solo últimas 100 respuestas)
        if (responseCache.size > 100) {
          const oldestKey = responseCache.keys().next().value;
          if (oldestKey) {
            responseCache.delete(oldestKey);
          }
        }
      }

      return res.json({
        response,
        provider,
        tokensUsed,
        sources: relevantDocs.map(d => ({
          collection: d.collection,
          id: d.id,
          title: d.title,
        })),
        fromCache: false,
      });

    } catch (error: any) {
      console.error('[Chatbot] Error:', error);
      
      return res.status(500).json({
        error: 'Error procesando tu pregunta',
        message: error.message,
        response: 'Lo siento, tuve un problema técnico. Por favor intenta de nuevo en un momento.',
      });
    }
  },
};

/**
 * Endpoint para estadísticas del chatbot (admin)
 */
export const ChatbotStatsEndpoint: Endpoint = {
  path: '/chatbot/stats',
  method: 'get',
  handler: async (req, res) => {
    const stats = getCacheStats();
    return res.json({
      knowledge: stats,
      responseCache: {
        size: responseCache.size,
        maxSize: 100,
      },
      config: {
        provider: process.env.AI_PROVIDER || 'gemini',
        cacheDuration: RESPONSE_CACHE_DURATION / 1000 / 60 + ' minutos',
      },
    });
  },
};

export default ChatbotEndpoint;
