/**
 * @openapi
 * /api/chatbot:
 *   post:
 *     tags:
 *       - Chatbot
 *     summary: Chatbot inteligente de la UNI
 *     description: |
 *       Chatbot con IA que responde preguntas sobre la Universidad Nacional de Ingeniería.
 *       
 *       **Características:**
 *       - Respuestas basadas en información real de las colecciones
 *       - Soporte para OpenAI GPT-3.5-turbo y Google Gemini
 *       - Sistema de caché para reducir costos
 *       - Respuestas naturales y amigables
 *       
 *       **Optimizado para bajo consumo:**
 *       - Caché de respuestas frecuentes (1 hora)
 *       - Límite de 300 tokens por respuesta
 *       - Búsqueda eficiente en memoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pregunta
 *             properties:
 *               pregunta:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 500
 *                 example: "¿Qué carreras de ingeniería ofrece la UNI?"
 *               message:
 *                 type: string
 *                 description: Alias de 'pregunta'
 *           examples:
 *             carrerasExample:
 *               summary: Pregunta sobre carreras
 *               value:
 *                 pregunta: "¿Qué carreras de ingeniería ofrece la UNI?"
 *             eventosExample:
 *               summary: Pregunta sobre eventos
 *               value:
 *                 pregunta: "¿Qué eventos hay próximamente?"
 *             contactoExample:
 *               summary: Pregunta sobre contacto
 *               value:
 *                 pregunta: "¿Cómo puedo contactar a la universidad?"
 *             recintosExample:
 *               summary: Pregunta sobre recintos
 *               value:
 *                 pregunta: "¿Dónde están ubicados los campus de la UNI?"
 *     responses:
 *       200:
 *         description: Respuesta del chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Respuesta generada por el chatbot
 *                   example: "La UNI ofrece varias carreras de ingeniería como Ingeniería en Sistemas, Ingeniería Civil, Ingeniería Eléctrica, entre otras. Puedes consultar la lista completa en nuestra sección de carreras."
 *                 provider:
 *                   type: string
 *                   enum: [openai, gemini, cache, none]
 *                   description: Proveedor de IA utilizado
 *                   example: "gemini"
 *                 tokensUsed:
 *                   type: integer
 *                   description: Tokens consumidos (si aplica)
 *                   example: 150
 *                 sources:
 *                   type: array
 *                   description: Fuentes de información utilizadas
 *                   items:
 *                     type: object
 *                     properties:
 *                       collection:
 *                         type: string
 *                         example: "carrera"
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                         example: "Ingeniería en Sistemas"
 *                 fromCache:
 *                   type: boolean
 *                   description: Si la respuesta vino del caché
 *                   example: false
 *             examples:
 *               successResponse:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   response: "La UNI ofrece varias carreras de ingeniería como Ingeniería en Sistemas, Ingeniería Civil e Ingeniería Eléctrica. Cada una tiene un perfil académico específico que puedes consultar en nuestro sitio web."
 *                   provider: "gemini"
 *                   tokensUsed: 145
 *                   sources:
 *                     - collection: "carrera"
 *                       id: "64a1b2c3d4e5f6g7h8i9j0k1"
 *                       title: "Ingeniería en Sistemas"
 *                     - collection: "carrera"
 *                       id: "64a1b2c3d4e5f6g7h8i9j0k2"
 *                       title: "Ingeniería Civil"
 *                   fromCache: false
 *               cachedResponse:
 *                 summary: Respuesta desde caché
 *                 value:
 *                   response: "La UNI está ubicada en Managua, con su campus principal en la Avenida Universitaria."
 *                   provider: "cache"
 *                   sources: []
 *                   fromCache: true
 *       400:
 *         description: Pregunta inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Por favor proporciona una pregunta válida"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *                 response:
 *                   type: string
 *                   example: "Lo siento, tuve un problema técnico. Por favor intenta de nuevo en un momento."
 * 
 * /api/chatbot/stats:
 *   get:
 *     tags:
 *       - Chatbot
 *     summary: Estadísticas del chatbot
 *     description: Obtiene estadísticas sobre el uso del chatbot y el estado del caché
 *     responses:
 *       200:
 *         description: Estadísticas del chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 knowledge:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: integer
 *                       example: 250
 *                     lastIndexed:
 *                       type: string
 *                       format: date-time
 *                     cacheAge:
 *                       type: integer
 *                       description: Edad del caché en milisegundos
 *                 responseCache:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: integer
 *                       example: 45
 *                     maxSize:
 *                       type: integer
 *                       example: 100
 *                 config:
 *                   type: object
 *                   properties:
 *                     provider:
 *                       type: string
 *                       example: "gemini"
 *                     cacheDuration:
 *                       type: string
 *                       example: "60 minutos"
 */

export {}
