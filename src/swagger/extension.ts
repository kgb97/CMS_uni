/**
 * @openapi
 * tags:
 *   - name: Extensión
 *     description: Información sobre programas y proyectos de extensión universitaria
 */

/**
 * @openapi
 * /api/extension:
 *   get:
 *     tags:
 *       - Extensión
 *     summary: Obtener todas las entradas de extensión
 *     responses:
 *       200:
 *         description: Lista de entradas de extensión
 *   post:
 *     tags:
 *       - Extensión
 *     summary: Crear una nueva entrada de extensión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               programas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     link:
 *                       type: string
 *                       format: uri
 *     responses:
 *       201:
 *         description: Entrada de extensión creada
 */

/**
 * @openapi
 * /api/extension/{id}:
 *   get:
 *     tags:
 *       - Extensión
 *     summary: Obtener una entrada de extensión por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrada encontrada
 *   patch:
 *     tags:
 *       - Extensión
 *     summary: Actualizar una entrada de extensión
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               programas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     link:
 *                       type: string
 *                       format: uri
 *     responses:
 *       200:
 *         description: Entrada de extensión actualizada
 *   delete:
 *     tags:
 *       - Extensión
 *     summary: Eliminar una entrada de extensión
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Entrada eliminada correctamente
 */
