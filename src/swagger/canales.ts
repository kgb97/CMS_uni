/**
 * @openapi
 * tags:
 *   - name: Canales
 *     description: Gestión de canales principales y sus subcanales asociados.
 */

/**
 * @openapi
 * /api/canales:
 *   get:
 *     tags:
 *       - Canales
 *     summary: Obtener todos los canales
 *     responses:
 *       200:
 *         description: Lista de canales
 *   post:
 *     tags:
 *       - Canales
 *     summary: Crear un nuevo canal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - icono
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Canal UNI Noticias
 *               icono:
 *                 type: string
 *                 description: ID del archivo en la colección "media"
 *                 example: 64f3a2c6b92f23001a2d4567
 *               sub_Canales:
 *                 type: array
 *                 description: IDs de subcanales asociados
 *                 items:
 *                   type: string
 *                   example: 64f3a2c6b92f23001a2d4568
 *     responses:
 *       201:
 *         description: Canal creado correctamente
 */

/**
 * @openapi
 * /api/canales/{id}:
 *   get:
 *     tags:
 *       - Canales
 *     summary: Obtener un canal por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Canal encontrado
 *   patch:
 *     tags:
 *       - Canales
 *     summary: Actualizar un canal existente
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
 *                 description: ID del archivo en "media"
 *               sub_Canales:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Canal actualizado correctamente
 *   delete:
 *     tags:
 *       - Canales
 *     summary: Eliminar un canal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Canal eliminado correctamente
 */
