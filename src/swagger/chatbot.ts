/**
 * @openapi
 * tags:
 *   - name: Chatbot
 *     description: Endpoint de interacción con el chatbot inteligente basado en contenido del CMS de la UNI.
 */

/**
 * @openapi
 * /api/chatbot:
 *   post:
 *     tags:
 *       - Chatbot
 *     summary: Enviar una pregunta al chatbot de la UNI
 *     description: |
 *       Este endpoint recibe una pregunta del usuario y devuelve una respuesta generada por el chatbot 
 *       usando el contenido indexado de Payload CMS. El chatbot utiliza embeddings de OpenAI (si está configurado) 
 *       o búsqueda por similitud de strings para encontrar la información más relevante.
 *       
 *       **Colecciones indexadas:**
 *       - Áreas de Conocimiento y Carreras
 *       - Noticias y Eventos
 *       - Investigaciones
 *       - Recintos y Contacto
 *       - Canales y SubCanales
 *       - Posgrado
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
 *                 description: La pregunta o consulta del usuario
 *                 minLength: 1
 *                 maxLength: 500
 *                 example: "¿Qué carreras ofrece el área de ingeniería?"
 *               message:
 *                 type: string
 *                 description: Alias alternativo para 'pregunta'
 *                 example: "¿Cuáles son los eventos disponibles este mes?"
 *     responses:
 *       200:
 *         description: Respuesta generada exitosamente por el chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Respuesta en formato Markdown con la información encontrada
 *                   example: |
 *                     ### 🔎 Ingeniería de Sistemas
 *                     
 *                     La carrera de Ingeniería de Sistemas forma profesionales capacitados...
 *                     
 *                     **Área de Conocimiento:** Ingeniería y Tecnología
 *                 collection:
 *                   type: string
 *                   description: Slug de la colección principal de donde proviene la respuesta
 *                   example: "carrera"
 *                 documentId:
 *                   type: string
 *                   description: ID del documento principal encontrado
 *                   example: "507f1f77bcf86cd799439011"
 *                 allResults:
 *                   type: array
 *                   description: Lista de todos los documentos relevantes encontrados
 *                   items:
 *                     type: object
 *                     properties:
 *                       collection:
 *                         type: string
 *                         example: "areas-de-conocimiento"
 *                       documentId:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439012"
 *       400:
 *         description: Error de validación - Mensaje vacío o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mensaje vacío"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al procesar la consulta"
 */
export {}
