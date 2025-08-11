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
 *                 example: https://example.com/icono-canal.png
 *               subCanales:
 *                 type: array
 *                 description: Lista de subcanales asociados
 *                 items:
 *                   type: object
 *                   required:
 *                     - nombre
 *                     - icono
 *                     - url
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: UNI TV
 *                     icono:
 *                       type: string
 *                       example: https://example.com/icono-subcanal.png
 *                     url:
 *                       type: string
 *                       example: https://example.com/uni-tv
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
 *               subCanales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     icono:
 *                       type: string
 *                     url:
 *                       type: string
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
