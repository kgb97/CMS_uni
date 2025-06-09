/**
 * @openapi
 * tags:
 *   - name: Recintos
 *     description: Gestión de recintos universitarios
 */

/**
 * @openapi
 * /api/recintos:
 *   get:
 *     tags:
 *       - Recintos
 *     summary: Obtener todos los recintos
 *     responses:
 *       200:
 *         description: Lista de recintos
 *   post:
 *     tags:
 *       - Recintos
 *     summary: Crear un nuevo recinto
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
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       example: '+505 1234 5678'
 *               telefaxes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefax:
 *                       type: string
 *                       example: '+505 1234 5678'
 *               apartadoPostal:
 *                 type: string
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - foto
 *                   properties:
 *                     foto:
 *                       type: string
 *                       description: ID del archivo subido (media)
 *                     alt:
 *                       type: string
 *                       description: Texto alternativo para la imagen
 *                     principal:
 *                       type: boolean
 *                       description: Marca esta foto como principal
 *     responses:
 *       201:
 *         description: Recinto creado
 */

/**
 * @openapi
 * /api/recintos/{id}:
 *   get:
 *     tags:
 *       - Recintos
 *     summary: Obtener un recinto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recinto encontrado
 *   patch:
 *     tags:
 *       - Recintos
 *     summary: Actualizar un recinto
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
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *               telefaxes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefax:
 *                       type: string
 *               apartadoPostal:
 *                 type: string
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foto:
 *                       type: string
 *                     alt:
 *                       type: string
 *                     principal:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: Recinto actualizado
 *   delete:
 *     tags:
 *       - Recintos
 *     summary: Eliminar un recinto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recinto eliminado
 */
