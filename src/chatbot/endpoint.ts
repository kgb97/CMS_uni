import { Endpoint } from 'payload/config';
import { generateChatResponse, ChatMessage } from './ai-providers';
import { searchKnowledge, indexKnowledge, getCacheStats, registerResponseCacheCleanup } from './knowledge-base';

// Caché de respuestas para preguntas frecuentes (solo sin historial)
const responseCache = new Map<string, { response: string; timestamp: number }>();
const RESPONSE_CACHE_DURATION = 1000 * 60 * 60; // 1 hora

// Sincronizar con knowledge cache: cuando la BD cambia, ambos caches se limpian
registerResponseCacheCleanup(() => {
  responseCache.clear();
  console.log('[Chatbot] Caché de respuestas limpiado');
});

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
    'qué comunicados', 'cuáles comunicados', 'todos los comunicados',
    'qué programas', 'cuáles programas', 'todos los programas',
    'qué autoridades', 'quiénes son las autoridades', 'lista de autoridades',
    'qué posgrados', 'cuáles posgrados', 'todos los posgrados', 'lista de posgrados',
    'qué investigaciones', 'cuáles investigaciones', 'todas las investigaciones',
    'qué redes sociales', 'cuáles redes', 'redes sociales de la uni',
    'qué canales', 'cuáles canales', 'todos los canales',
    'listar', 'mostrar todas', 'mostrar todos', 'cuántas', 'cuántos',
  ];
  
  const queryLower = query.toLowerCase();
  return listKeywords.some(keyword => queryLower.includes(keyword));
}

/**
 * Genera los mensajes del prompt incluyendo historial de conversación
 */
function buildPrompt(
  query: string,
  context: string,
  needsFullList: boolean,
  history: ChatMessage[] = []
): ChatMessage[] {
  const today = new Date().toLocaleDateString('es-NI', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatInstructions = needsFullList
    ? `
FORMATO PARA LISTADOS:
- Usa emojis relevantes para cada categoría (🎓 📚 🔬 🏗️ 💻 ⚡ 🏭 🧪 📐 🌱)
- Agrupa las carreras por área o facultad si hay múltiples
- Usa numeración clara con puntos (1. 2. 3.)
- Usa líneas de guiones (---) para separar secciones principales
- Usa líneas en blanco para separar grupos
- NO uses asteriscos (**) ni formato Markdown
- Usa MAYÚSCULAS para títulos de secciones
- Al final, agrega un llamado a la acción amigable

EJEMPLO DE FORMATO:
🎓 CARRERAS DE PREGRADO
---

INGENIERÍA Y TECNOLOGÍA:
1. Ingeniería en Sistemas
2. Ingeniería Civil
3. Ingeniería Eléctrica

ARQUITECTURA:
1. Arquitectura

📚 PROGRAMAS DE POSGRADO
---

1. Maestría en Ingeniería de Software
2. Maestría en Energías Renovables

💡 Para más información sobre admisión, costos o perfil de cada carrera, ¡pregúntame!`
    : `
FORMATO PARA RESPUESTAS CORTAS:
- Usa emojis relevantes (📍 📞 📧 🕐 💰 📅)
- NO uses asteriscos (**) ni formato Markdown
- Usa MAYÚSCULAS para resaltar títulos o información clave
- Separa información con saltos de línea
- Usa guiones (-) para listas simples
- Si hay datos específicos (fechas, números, direcciones), ponlos en líneas separadas
- Termina con una pregunta o sugerencia amigable si es apropiado

EJEMPLO DE FORMATO:
📍 UBICACIÓN:
Campus Central, Managua

📞 TELÉFONO:
2278-1234

🕐 HORARIO:
Lunes a Viernes: 8:00 AM - 5:00 PM

¿Necesitas más información?`;

  const systemMessage: ChatMessage = {
    role: 'system',
    content: `Eres el asistente oficial de la Universidad Nacional de Ingeniería (UNI) de Nicaragua.

Fecha actual: ${today}

TU MISIÓN:
- Responder siempre en español de forma amigable, clara y profesional
- Usar texto plano bien formateado (NO uses Markdown ni asteriscos **)
- Ser preciso y basarte SOLO en el contexto proporcionado
- Si no tienes la información, ser honesto y sugerir contactar a la UNI

IMPORTANTE:
- NO inventes datos, fechas, nombres o información que no esté en el contexto
- NO uses asteriscos (**) ni otros símbolos de Markdown
- NO repitas información innecesariamente
- SÍ usa emojis para hacer la respuesta más visual y amigable
- SÍ usa MAYÚSCULAS para títulos y énfasis
- SÍ usa líneas separadoras (---) para dividir secciones
- SÍ usa saltos de línea para mejorar la legibilidad

${formatInstructions}`,
  };

  const userMessage: ChatMessage = {
    role: 'user',
    content: context
      ? `Contexto disponible:\n${context}\n\nPregunta: ${query}`
      : query,
  };

  // Incluir historial entre el system message y el mensaje actual
  return [systemMessage, ...history, userMessage];
}

const ChatbotEndpoint: Endpoint = {
  path: '/chatbot',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { pregunta, message, history } = req.body;
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

      // Validar y sanitizar historial
      const conversationHistory: ChatMessage[] = Array.isArray(history)
        ? history
            .filter((m: any) => m && typeof m.role === 'string' && typeof m.content === 'string')
            .filter((m: any) => m.role === 'user' || m.role === 'assistant')
            .slice(-10) // Máximo últimos 10 mensajes para no exceder tokens
        : [];

      const hasHistory = conversationHistory.length > 0;

      // Solo usar caché si no hay historial (conversación nueva)
      const cacheKey = query.toLowerCase().replace(/\s+/g, ' ');
      if (!hasHistory) {
        const cached = responseCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < RESPONSE_CACHE_DURATION) {
          console.log('[Chatbot] Respuesta desde caché');
          return res.json({
            response: cached.response,
            fromCache: true,
            provider: 'cache',
          });
        }
      }

      // Asegurar que la base de conocimiento esté indexada
      await indexKnowledge(req.payload);

      // Detectar si debe listar todo
      const needsFullList = shouldListAll(query);

      // Buscar información relevante (más resultados si necesita listar todo)
      const limit = needsFullList ? 50 : 5;
      const relevantDocs = await searchKnowledge(query, limit);

      let response: string;
      let provider: string;
      let tokensUsed: number | undefined;

      if (relevantDocs.length === 0 && !hasHistory) {
        // Sin contexto y sin historial previo
        response = 'Lo siento, no encontré información específica sobre eso. Puedo ayudarte con:\n\n🎓 Carreras y programas académicos\n📅 Eventos universitarios\n🏛️ Recintos y campus\n📰 Noticias y comunicados\n🔬 Investigaciones y posgrados\n📞 Información de contacto\n\n¿Sobre cuál de estos temas deseas saber?';
        provider = 'none';
      } else {
        // Construir contexto — más chars por item cuando se necesita listar todo
        const contextLength = needsFullList ? 300 : 200;
        const context = relevantDocs
          .map((doc, i) => `${i + 1}. ${doc.title}: ${doc.content.substring(0, contextLength)}`)
          .join('\n');

        // Generar respuesta con IA
        const messages = buildPrompt(query, context, needsFullList, conversationHistory);
        let aiResponse;
        try {
          aiResponse = await generateChatResponse(messages);
        } catch (aiError: any) {
          console.error('[Chatbot] Todos los proveedores de IA fallaron:', aiError.message);
          // Degradación elegante: responder con el contexto encontrado sin IA
          const fallbackItems = relevantDocs.slice(0, 3).map((d, i) => `${i + 1}. ${d.title}`).join('\n');
          return res.json({
            response: `⚠️ En este momento el asistente inteligente no está disponible, pero encontré información relacionada con tu pregunta:\n\n${fallbackItems}\n\nPara más detalles, contacta a la UNI directamente.`,
            provider: 'fallback',
            sources: relevantDocs.map(d => ({ collection: d.collection, id: d.id, title: d.title })),
            fromCache: false,
          });
        }

        response = aiResponse.content;
        provider = aiResponse.provider;
        tokensUsed = aiResponse.tokensUsed;

        // Guardar en caché solo si no hay historial
        if (!hasHistory) {
          responseCache.set(cacheKey, {
            response,
            timestamp: Date.now(),
          });

          console.log(`[Chatbot] Respuesta cacheada. Tamaño del caché: ${responseCache.size}`);

          // Limpiar caché viejo (mantener solo últimas 100 respuestas)
          if (responseCache.size > 100) {
            const oldestKey = responseCache.keys().next().value;
            if (oldestKey) {
              responseCache.delete(oldestKey);
            }
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
