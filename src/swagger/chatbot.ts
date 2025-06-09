/**
 * @openapi
 * tags:
 *   - name: Chatbot
 *     description: Endpoint de interacción con el chatbot basado en contenido del CMS.
 */

/**
 * @openapi
 * /api/chatbot:
 *   post:
 *     tags:
 *       - Chatbot
 *     summary: Enviar una pregunta al chatbot
 *     description: Este endpoint recibe una pregunta del usuario y devuelve una respuesta generada por el chatbot usando el contenido de Payload CMS.
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
 *                 example: "¿Cuáles son los eventos disponibles este mes?"
 *     responses:
 *       200:
 *         description: Respuesta generada por el chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 respuesta:
 *                   type: string
 *                   example: "📅 Este mes hay dos eventos: Taller de innovación y Feria tecnológica."
 *       400:
 *         description: Error al procesar la pregunta (por ejemplo, faltan campos requeridos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falta el campo 'pregunta'"
 */
export {}
