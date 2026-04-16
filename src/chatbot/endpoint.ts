import { Endpoint } from 'payload/config';
import { generateChatResponse, ChatMessage } from './ai-providers';
import { searchKnowledge, indexKnowledge, getCacheStats, registerResponseCacheCleanup, knowledgeCache } from './knowledge-base';

// Caché de respuestas para preguntas frecuentes (solo sin historial)
const responseCache = new Map<string, { response: string; timestamp: number }>();
// OPTIMIZACIÓN: Aumentado de 1 hora a 24 horas para más hits de caché
const RESPONSE_CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 horas
const MAX_CACHE_SIZE = 500; // Aumentado de 100 a 500

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

⚠️ IMPORTANTE PARA LISTAS:
- SOLO lista los items que aparecen en el CONTEXTO
- NO agregues items adicionales aunque creas que deberían existir
- Si solo hay 5 carreras en el contexto, lista SOLO esas 5
- NO completes la lista con carreras que "probablemente existan"
- Es mejor una lista corta y precisa que una lista larga con información falsa

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
    content: `Asistente oficial UNI Nicaragua. Fecha: ${today}

⚠️ REGLAS ESTRICTAS - DEBES SEGUIRLAS AL PIE DE LA LETRA:
1. SOLO usa información que esté EXPLÍCITAMENTE en el CONTEXTO proporcionado
2. NUNCA inventes, supongas o agregues información que no esté en el contexto
3. Si te preguntan por una lista completa, SOLO menciona los items que aparecen en el contexto
4. Si no está en el contexto, responde: "No tengo esa información en este momento"
5. NO agregues carreras, eventos, o cualquier dato que no esté listado en el contexto
6. Formato: texto plano, emojis, MAYÚSCULAS para títulos
7. NO uses Markdown ni asteriscos

${formatInstructions}`,
  };

  const userMessage: ChatMessage = {
    role: 'user',
    content: context
      ? `CONTEXTO DISPONIBLE (ESTA ES TODA LA INFORMACIÓN QUE TIENES - NO INVENTES NADA MÁS):\n${context}\n\n⚠️ ADVERTENCIA CRÍTICA: La lista anterior es COMPLETA y EXHAUSTIVA. NO agregues ningún item que no esté listado arriba. Si el usuario pregunta "qué carreras ofrece la UNI", SOLO menciona las carreras que aparecen en el contexto anterior. NO inventes ni supongas carreras adicionales.\n\nPREGUNTA DEL USUARIO: ${query}`
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

      const queryLower = query.toLowerCase().trim();
      
      // Detectar preguntas sobre identidad del chatbot
      const identityKeywords = [
        'quién eres', 'quien eres', 'qué eres', 'que eres',
        'cómo te llamas', 'como te llamas', 'tu nombre',
        'preséntate', 'presentate', 'dime quién eres',
        'eres un bot', 'eres una ia', 'eres inteligencia artificial'
      ];
      
      const isIdentityQuestion = identityKeywords.some(keyword => queryLower.includes(keyword));
      
      if (isIdentityQuestion) {
        return res.json({
          response: '¡Hola! 👋\n\nSoy el asistente virtual oficial de la Universidad Nacional de Ingeniería (UNI) de Nicaragua.\n\nMi función es ayudarte a encontrar información sobre:\n\n🎓 Carreras y programas académicos\n📅 Eventos universitarios\n🏛️ Recintos y campus\n📰 Noticias y comunicados\n🔬 Investigaciones y posgrados\n📞 Información de contacto\n\n¿En qué puedo ayudarte hoy?',
          provider: 'predefined',
          fromCache: false,
        });
      }
      
      // Detectar saludos simples
      const greetings = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'holi'];
      const isGreeting = greetings.some(greeting => queryLower === greeting || queryLower === greeting + '!');
      
      if (isGreeting) {
        return res.json({
          response: '¡Hola! 👋 Bienvenido al asistente virtual de la UNI.\n\n¿En qué puedo ayudarte hoy?\n\nPuedes preguntarme sobre:\n🎓 Carreras\n📅 Eventos\n🏛️ Recintos\n📰 Noticias\n🔬 Investigaciones\n📞 Contacto',
          provider: 'predefined',
          fromCache: false,
        });
      }
      
      // Detectar despedidas
      const farewells = ['adiós', 'adios', 'chao', 'hasta luego', 'nos vemos', 'gracias', 'bye'];
      const isFarewell = farewells.some(farewell => queryLower.includes(farewell));
      
      if (isFarewell) {
        return res.json({
          response: '¡Hasta pronto! 👋\n\nFue un placer ayudarte. Si tienes más preguntas sobre la UNI, no dudes en volver.\n\n¡Que tengas un excelente día! 😊',
          provider: 'predefined',
          fromCache: false,
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

      // OPTIMIZACIÓN: La indexación se hace en background al iniciar el servidor
      // Solo re-indexar si el caché está vacío (por si acaso)
      if (knowledgeCache.length === 0) {
        console.log('[Chatbot] Caché vacío, indexando...');
        await indexKnowledge(req.payload);
      }

      // Detectar si debe listar todo
      const needsFullList = shouldListAll(query);

      // Buscar información relevante (más resultados si necesita listar todo)
      // IMPORTANTE: Para listados completos, obtener TODAS las carreras/items disponibles
      const limit = needsFullList ? 100 : 3;
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
        // OPTIMIZACIÓN: Reducido de 300 a 250 para mejorar velocidad
        const contextLength = needsFullList ? 250 : 180;
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

          // Limpiar caché viejo (mantener solo últimas respuestas)
          if (responseCache.size > MAX_CACHE_SIZE) {
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
