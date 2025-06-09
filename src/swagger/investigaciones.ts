/**
 * @openapi
 * tags:
 *   - name: Investigaciones
 *     description: Gestión de investigaciones
 */

/**
 * @openapi
 * /api/investigaciones:
 *   get:
 *     tags:
 *       - Investigaciones
 *     summary: Obtener todas las investigaciones
 *     responses:
 *       200:
 *         description: Lista de investigaciones
 *   post:
 *     tags:
 *       - Investigaciones
 *     summary: Crear una investigación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *               icono:
 *                 type: string
 *                 description: ID del archivo de media (opcional)
 *               descripcion:
 *                 type: string
 *               link:
 *                 type: string
 *                 format: uri
 *                 description: URL válida (opcional)
 *     responses:
 *       201:
 *         description: Investigación creada
 */

/**
 * @openapi
 * /api/investigaciones/{id}:
 *   get:
 *     tags:
 *       - Investigaciones
 *     summary: Obtener una investigación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Investigación encontrada
 *   patch:
 *     tags:
 *       - Investigaciones
 *     summary: Actualizar una investigación
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
 *               nombre:
 *                 type: string
 *               icono:
 *                 type: string
 *                 description: ID del archivo de media (opcional)
 *               descripcion:
 *                 type: string
 *               link:
 *                 type: string
 *                 format: uri
 *                 description: URL válida (opcional)
 *     responses:
 *       200:
 *         description: Investigación actualizada
 *   delete:
 *     tags:
 *       - Investigaciones
 *     summary: Eliminar una investigación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Investigación eliminada
 */
