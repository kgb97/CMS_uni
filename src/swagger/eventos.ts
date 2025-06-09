/**
 * @openapi
 * tags:
 *   - name: Eventos
 *     description: Eventos institucionales
 */

/**
 * @openapi
 * /api/eventos:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Obtener todos los eventos
 *     responses:
 *       200:
 *         description: Lista de eventos
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Crear un nuevo evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *               titulo:
 *                 type: string
 *               lugar:
 *                 type: string
 *               imagen:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento creado
 */
