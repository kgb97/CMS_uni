/**
 * @openapi
 * tags:
 *   - name: Redes Sociales
 *     description: Gestión de redes sociales institucionales
 */

/**
 * @openapi
 * /api/redes-sociales:
 *   get:
 *     tags:
 *       - Redes Sociales
 *     summary: Obtener todas las redes sociales
 *     responses:
 *       200:
 *         description: Lista de redes sociales
 *   post:
 *     tags:
 *       - Redes Sociales
 *     summary: Crear una nueva red social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - icono
 *               - url
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Facebook
 *               icono:
 *                 type: string
 *                 description: ID del archivo subido (media)
 *                 example: 64f3b8a7e17f9a001b2f8cde
 *               url:
 *                 type: string
 *                 example: https://facebook.com/usuario
 *     responses:
 *       201:
 *         description: Red social creada
 */

/**
 * @openapi
 * /api/redes-sociales/{id}:
 *   get:
 *     tags:
 *       - Redes Sociales
 *     summary: Obtener una red social por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Red social encontrada
 *   patch:
 *     tags:
 *       - Redes Sociales
 *     summary: Actualizar una red social
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
 *                 example: Instagram
 *               icono:
 *                 type: string
 *                 description: ID del archivo subido (media)
 *                 example: 64f3b8a7e17f9a001b2f8cde
 *               url:
 *                 type: string
 *                 example: https://instagram.com/usuario
 *     responses:
 *       200:
 *         description: Red social actualizada
 *   delete:
 *     tags:
 *       - Redes Sociales
 *     summary: Eliminar una red social
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Red social eliminada
 */
