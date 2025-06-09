/**
 * @openapi
 * tags:
 *   - name: Multimedia
 *     description: Galería de imágenes y videos
 */

/**
 * @openapi
 * /api/multimedia:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Obtener multimedia
 *     responses:
 *       200:
 *         description: Lista de elementos multimedia
 *   post:
 *     tags:
 *       - Multimedia
 *     summary: Subir multimedia
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               enlaceYoutube:
 *                 type: string
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Multimedia creada
 */
