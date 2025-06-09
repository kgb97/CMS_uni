/**
 * @openapi
 * tags:
 *   - name: InvestigacionArea
 *     description: Áreas de investigación con investigaciones relacionadas
 */

/**
 * @openapi
 * /api/investigacion-area:
 *   get:
 *     tags:
 *       - InvestigacionArea
 *     summary: Obtener todas las áreas de investigación
 *     responses:
 *       200:
 *         description: Lista de áreas de investigación
 *   post:
 *     tags:
 *       - InvestigacionArea
 *     summary: Crear un área de investigación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - investigaciones
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               investigaciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - investigacion
 *                   properties:
 *                     investigacion:
 *                       type: string
 *                       description: ID de la investigación relacionada
 *     responses:
 *       201:
 *         description: Área de investigación creada
 */

/**
 * @openapi
 * /api/investigacion-area/{id}:
 *   get:
 *     tags:
 *       - InvestigacionArea
 *     summary: Obtener un área de investigación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área de investigación encontrada
 *   patch:
 *     tags:
 *       - InvestigacionArea
 *     summary: Actualizar un área de investigación
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
 *               investigaciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     investigacion:
 *                       type: string
 *                       description: ID de la investigación relacionada
 *     responses:
 *       200:
 *         description: Área de investigación actualizada
 *   delete:
 *     tags:
 *       - InvestigacionArea
 *     summary: Eliminar un área de investigación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Área de investigación eliminada correctamente
 */
