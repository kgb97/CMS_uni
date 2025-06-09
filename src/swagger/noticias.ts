/**
 * @openapi
 * tags:
 *   - name: Noticias
 *     description: Gestión de noticias
 */

/**
 * @openapi
 * /api/noticias:
 *   get:
 *     tags:
 *       - Noticias
 *     summary: Obtener todas las noticias
 *     responses:
 *       200:
 *         description: Lista de noticias
 *   post:
 *     tags:
 *       - Noticias
 *     summary: Crear una nueva noticia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               imagen:
 *                 type: string
 *               descripcionCorta:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               descripcionLarga:
 *                 type: string
 *     responses:
 *       201:
 *         description: Noticia creada
 */
