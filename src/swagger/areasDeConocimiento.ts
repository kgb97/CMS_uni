/**
 * @openapi
 * tags:
 *   - name: Áreas de Conocimiento
 *     description: Gestión de áreas de conocimiento y sus carreras relacionadas.
 */

/**
 * @openapi
 * /api/areas-de-conocimiento:
 *   get:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Obtener todas las áreas de conocimiento
 *     responses:
 *       200:
 *         description: Lista de áreas de conocimiento
 *   post:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Crear una nueva área de conocimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               carrerasRelacionadas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de la carrera relacionada
 *     responses:
 *       201:
 *         description: Área de conocimiento creada
 */

/**
 * @openapi
 * /api/areas-de-conocimiento/{id}:
 *   get:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Obtener un área de conocimiento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *   patch:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Actualizar un área de conocimiento
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
 *               descripcion:
 *                 type: string
 *               carrerasRelacionadas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Área actualizada correctamente
 *   delete:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Eliminar un área de conocimiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */
