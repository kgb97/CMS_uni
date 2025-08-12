/**
 * @openapi
 * tags:
 *   - name: Recintos
 *     description: Gestión de recintos con teléfonos, telefaxes y fotos.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recinto'
 *   post:
 *     tags:
 *       - Recintos
 *     summary: Crear un nuevo recinto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecintoRequest'
 *     responses:
 *       201:
 *         description: Recinto creado correctamente
 *
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recinto'
 *   patch:
 *     tags:
 *       - Recintos
 *     summary: Actualizar un recinto existente
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
 *             $ref: '#/components/schemas/UpdateRecintoRequest'
 *     responses:
 *       200:
 *         description: Recinto actualizado correctamente
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
 *         description: Recinto eliminado correctamente
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Recinto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f3b9a0e17f9a001b2f8cdf
 *         nombre:
 *           type: string
 *           example: Recinto Central
 *         descripcion:
 *           type: string
 *           example: Recinto principal ubicado en Managua.
 *         telefonos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: string
 *                 example: '+505 1234 5678'
 *         telefaxes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefax:
 *                 type: string
 *                 example: '+505 8765 4321'
 *         apartadoPostal:
 *           type: string
 *           example: 'AP1234'
 *         fotos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               foto:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60a7f2d1c1234b001a2b345c
 *                   filename:
 *                     type: string
 *                     example: recinto1.jpg
 *                   url:
 *                     type: string
 *                     example: https://payload-cloud-url/media/recinto1.jpg
 *               alt:
 *                 type: string
 *                 example: Foto del Recinto Central
 *               principal:
 *                 type: boolean
 *                 example: true
 *
 *     CreateRecintoRequest:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: Recinto Central
 *         descripcion:
 *           type: string
 *           example: Recinto principal ubicado en Managua.
 *         telefonos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: string
 *                 example: '+505 1234 5678'
 *         telefaxes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefax:
 *                 type: string
 *                 example: '+505 8765 4321'
 *         apartadoPostal:
 *           type: string
 *           example: 'AP1234'
 *         fotos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 description: ID del archivo en la colección media
 *                 example: 60a7f2d1c1234b001a2b345c
 *               alt:
 *                 type: string
 *                 example: Foto del Recinto Central
 *               principal:
 *                 type: boolean
 *                 example: true
 *
 *     UpdateRecintoRequest:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         telefonos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: string
 *         telefaxes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               telefax:
 *                 type: string
 *         apartadoPostal:
 *           type: string
 *         fotos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 description: ID del archivo en la colección media
 *               alt:
 *                 type: string
 *               principal:
 *                 type: boolean
 */
