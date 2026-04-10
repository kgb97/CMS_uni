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
 *       - Búsqueda semántica con embeddings (nomic-embed-text vía Ollama)
 *       - Soporte para Ollama (local/red), Google Gemini y OpenAI
 *       - Historial de conversación multi-turno (hasta 10 mensajes)
 *       - Caché de respuestas frecuentes (1 hora), invalidado automáticamente al editar la BD
 *       - Degradación elegante si la IA no está disponible
 *       
 *       **Colecciones indexadas (16):**
 *       noticias, eventos, áreas de conocimiento, carreras, recintos, contáctanos,
 *       posgrado, investigaciones, comunicados, extensión, organización UNI,
 *       divisiones, cargos, redes sociales, canales, subcanales
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
 *               history:
 *                 type: array
 *                 description: Historial de conversación para contexto multi-turno (máximo 10 mensajes)
 *                 items:
 *                   type: object
 *                   required:
 *                     - role
 *                     - content
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant]
 *                     content:
 *                       type: string
 *           examples:
 *             carrerasExample:
 *               summary: Pregunta sobre carreras
 *               value:
 *                 pregunta: "¿Qué carreras de ingeniería ofrece la UNI?"
 *             eventosExample:
 *               summary: Pregunta sobre eventos
 *               value:
 *                 pregunta: "¿Qué eventos hay próximamente?"
 *             conHistorialExample:
 *               summary: Pregunta con historial de conversación
 *               value:
 *                 pregunta: "¿Y cuánto dura esa carrera?"
 *                 history:
 *                   - role: "user"
 *                     content: "¿Qué carreras ofrece la UNI?"
 *                   - role: "assistant"
 *                     content: "La UNI ofrece Ingeniería en Sistemas, Civil, Eléctrica, entre otras."
 *             autoridadesExample:
 *               summary: Pregunta sobre autoridades
 *               value:
 *                 pregunta: "¿Quiénes son las autoridades de la UNI?"
 *             redesExample:
 *               summary: Pregunta sobre redes sociales
 *               value:
 *                 pregunta: "¿Cuáles son las redes sociales de la UNI?"
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
 *                 provider:
 *                   type: string
 *                   enum: [ollama, gemini, openai, cache, fallback, none]
 *                   description: Proveedor utilizado. 'fallback' indica que la IA no estaba disponible pero se encontró información relevante.
 *                   example: "ollama"
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
 *                 summary: Respuesta exitosa con Ollama
 *                 value:
 *                   response: "La UNI ofrece Ingeniería en Sistemas, Civil e Ingeniería Eléctrica, entre otras carreras."
 *                   provider: "ollama"
 *                   tokensUsed: 145
 *                   sources:
 *                     - collection: "carrera"
 *                       id: "64a1b2c3d4e5f6g7h8i9j0k1"
 *                       title: "Ingeniería en Sistemas"
 *                   fromCache: false
 *               cachedResponse:
 *                 summary: Respuesta desde caché
 *                 value:
 *                   response: "La UNI está ubicada en Managua, con su campus principal en la Avenida Universitaria."
 *                   provider: "cache"
 *                   sources: []
 *                   fromCache: true
 *               fallbackResponse:
 *                 summary: Degradación elegante (IA no disponible)
 *                 value:
 *                   response: "En este momento el asistente inteligente no está disponible, pero encontré información relacionada:\n\n• Ingeniería en Sistemas\n• Ingeniería Civil\n\nPara más detalles, contacta a la UNI directamente."
 *                   provider: "fallback"
 *                   sources:
 *                     - collection: "carrera"
 *                       id: "64a1b2c3d4e5f6g7h8i9j0k1"
 *                       title: "Ingeniería en Sistemas"
 *                   fromCache: false
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
 *                       enum: [ollama, gemini, openai]
 *                       example: "ollama"
 *                     cacheDuration:
 *                       type: string
 *                       example: "60 minutos"
 * 
 * /api/chatbot/questions:
 *   get:
 *     tags:
 *       - Chatbot
 *     summary: Preguntas frecuentes y sugeridas
 *     description: |
 *       Obtiene una lista de preguntas frecuentes organizadas por categorías para ayudar a los usuarios.
 *       
 *       **Categorías disponibles:**
 *       - Carreras y Programas
 *       - Admisión e Inscripción
 *       - Campus y Recintos
 *       - Eventos y Noticias
 *       - Investigación
 *       - Contacto y Ayuda
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar preguntas por categoría específica
 *         example: "Carreras y Programas"
 *     responses:
 *       200:
 *         description: Lista de preguntas sugeridas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total de preguntas disponibles
 *                   example: 24
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Carreras y Programas"
 *                       icon:
 *                         type: string
 *                         example: "🎓"
 *                       questions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "carreras-disponibles"
 *                             question:
 *                               type: string
 *                               example: "¿Qué carreras ofrece la UNI?"
 *                             category:
 *                               type: string
 *                               example: "Carreras y Programas"
 *                             icon:
 *                               type: string
 *                               example: "📚"
 *             examples:
 *               allCategories:
 *                 summary: Todas las categorías
 *                 value:
 *                   total: 24
 *                   categories:
 *                     - name: "Carreras y Programas"
 *                       icon: "🎓"
 *                       questions:
 *                         - id: "carreras-disponibles"
 *                           question: "¿Qué carreras ofrece la UNI?"
 *                           category: "Carreras y Programas"
 *                           icon: "📚"
 *                         - id: "ingenieria-sistemas"
 *                           question: "¿Qué aprendo en Ingeniería de Sistemas?"
 *                           category: "Carreras y Programas"
 *                           icon: "💻"
 *               singleCategory:
 *                 summary: Una categoría específica
 *                 value:
 *                   category: "Eventos y Noticias"
 *                   icon: "📰"
 *                   questions:
 *                     - id: "proximos-eventos"
 *                       question: "¿Qué eventos próximos hay?"
 *                       category: "Eventos y Noticias"
 *                       icon: "🎉"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoría no encontrada"
 *                 availableCategories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Carreras y Programas", "Admisión e Inscripción"]
 * 
 * /api/chatbot/questions/random:
 *   get:
 *     tags:
 *       - Chatbot
 *     summary: Pregunta aleatoria
 *     description: Obtiene una pregunta aleatoria, opcionalmente filtrada por categoría
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría específica
 *         example: "Investigación"
 *     responses:
 *       200:
 *         description: Pregunta aleatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "proyectos-investigacion"
 *                     question:
 *                       type: string
 *                       example: "¿Qué proyectos de investigación tienen?"
 *                     category:
 *                       type: string
 *                       example: "Investigación"
 *                     icon:
 *                       type: string
 *                       example: "🧪"
 *             examples:
 *               randomQuestion:
 *                 summary: Pregunta aleatoria
 *                 value:
 *                   question:
 *                     id: "contacto-general"
 *                     question: "¿Cómo puedo contactar a la UNI?"
 *                     category: "Contacto y Ayuda"
 *                     icon: "📧"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 availableCategories:
 *                   type: array
 *                   items:
 *                     type: string
 */

export {}
