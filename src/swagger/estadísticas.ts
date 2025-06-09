/**
 * @openapi
 * tags:
 *   - name: Estadísticas
 *     description: Indicadores institucionales
 */

/**
 * @openapi
 * /api/estadisticas:
 *   get:
 *     tags:
 *       - Estadísticas
 *     summary: Obtener todas las estadísticas
 *     responses:
 *       200:
 *         description: Lista de estadísticas
 *   post:
 *     tags:
 *       - Estadísticas
 *     summary: Crear una estadística
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       201:
 *         description: Estadística creada
 */
