/**
 * @openapi
 * tags:
 *   - name: Comunicados
 *     description: Lista de comunicados con título y enlace.
 */

/**
 * @openapi
 * /api/comunicados:
 *   get:
 *     tags:
 *       - Comunicados
 *     summary: Obtener todos los comunicados
 *     responses:
 *       200:
 *         description: Lista de comunicados
 *   post:
 *     tags:
 *       - Comunicados
 *     summary: Crear un nuevo comunicado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - link
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Suspensión de clases por mantenimiento
 *               link:
 *                 type: string
 *                 format: uri
 *                 example: https://ejemplo.com/comunicado.pdf
 *     responses:
 *       201:
 *         description: Comunicado creado correctamente
 */

/**
 * @openapi
 * /api/comunicados/{id}:
 *   get:
 *     tags:
 *       - Comunicados
 *     summary: Obtener un comunicado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comunicado encontrado
 *   patch:
 *     tags:
 *       - Comunicados
 *     summary: Actualizar un comunicado existente
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
 *               link:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Comunicado actualizado correctamente
 *   delete:
 *     tags:
 *       - Comunicados
 *     summary: Eliminar un comunicado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comunicado eliminado correctamente
 */
