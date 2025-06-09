/**
 * @openapi
 * tags:
 *   - name: Posgrado
 *     description: Gestión de programas de posgrado
 */

/**
 * @openapi
 * /api/posgrado:
 *   get:
 *     tags:
 *       - Posgrado
 *     summary: Obtener todos los programas de posgrado
 *     responses:
 *       200:
 *         description: Lista de programas de posgrado
 *   post:
 *     tags:
 *       - Posgrado
 *     summary: Crear un programa de posgrado
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
 *               descripcion:
 *                 type: string
 *               enlace:
 *                 type: string
 *                 format: uri
 *                 description: URL válida (opcional)
 *     responses:
 *       201:
 *         description: Programa de posgrado creado
 */

/**
 * @openapi
 * /api/posgrado/{id}:
 *   get:
 *     tags:
 *       - Posgrado
 *     summary: Obtener un programa de posgrado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Programa de posgrado encontrado
 *   patch:
 *     tags:
 *       - Posgrado
 *     summary: Actualizar un programa de posgrado
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
 *               enlace:
 *                 type: string
 *                 format: uri
 *                 description: URL válida (opcional)
 *     responses:
 *       200:
 *         description: Programa de posgrado actualizado
 *   delete:
 *     tags:
 *       - Posgrado
 *     summary: Eliminar un programa de posgrado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Programa de posgrado eliminado
 */
