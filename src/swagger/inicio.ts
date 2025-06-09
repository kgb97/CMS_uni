/**
 * @openapi
 * tags:
 *   - name: Inicio
 *     description: Sección principal del sitio
 */

/**
 * @openapi
 * /api/inicio:
 *   get:
 *     tags:
 *       - Inicio
 *     summary: Obtener datos de inicio
 *     responses:
 *       200:
 *         description: Contenido de inicio
 *   post:
 *     tags:
 *       - Inicio
 *     summary: Crear contenido para inicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagenFondo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contenido creado
 */
