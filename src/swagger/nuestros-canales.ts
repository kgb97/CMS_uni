/**
 * @openapi
 * tags:
 *   - name: Nuestros Canales
 *     description: Canales informativos de la institución
 */

/**
 * @openapi
 * /api/nuestros-canales:
 *   get:
 *     tags:
 *       - Nuestros Canales
 *     summary: Obtener canales
 *     responses:
 *       200:
 *         description: Lista de canales
 *   post:
 *     tags:
 *       - Nuestros Canales
 *     summary: Crear canal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcionCorta:
 *                 type: string
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Canal creado
 */
