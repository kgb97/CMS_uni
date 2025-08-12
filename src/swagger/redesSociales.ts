/**
 * @openapi
 * tags:
 *   - name: RedesSociales
 *     description: Gestión de redes sociales
 *
 * /api/redesSociales:
 *   get:
 *     tags:
 *       - RedesSociales
 *     summary: Obtener todas las redes sociales
 *     responses:
 *       200:
 *         description: Lista de redes sociales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RedSocial'
 *
 *   post:
 *     tags:
 *       - RedesSociales
 *     summary: Crear una nueva red social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRedSocialRequest'
 *     responses:
 *       201:
 *         description: Red social creada correctamente
 *
 * /api/redesSociales/{id}:
 *   get:
 *     tags:
 *       - RedesSociales
 *     summary: Obtener una red social por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la red social
 *     responses:
 *       200:
 *         description: Red social encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RedSocial'
 *
 *   patch:
 *     tags:
 *       - RedesSociales
 *     summary: Actualizar una red social por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la red social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRedSocialRequest'
 *     responses:
 *       200:
 *         description: Red social actualizada correctamente
 *
 *   delete:
 *     tags:
 *       - RedesSociales
 *     summary: Eliminar una red social por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la red social
 *     responses:
 *       204:
 *         description: Red social eliminada correctamente
 *
 * components:
 *   schemas:
 *     RedSocial:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la red social
 *           example: 64f3b8a7e17f9a001b2f8cde
 *         nombre:
 *           type: string
 *           description: Nombre de la red social
 *           example: Facebook
 *         icono:
 *           type: string
 *           description: ID del archivo en la colección "media"
 *           example: 609c5f0c1d2a3e4f56789abc
 *         url:
 *           type: string
 *           description: URL de la red social
 *           example: https://facebook.com/usuario
 *
 *     CreateRedSocialRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - icono
 *         - url
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la red social
 *           example: Instagram
 *         icono:
 *           type: string
 *           description: ID del archivo en la colección "media"
 *           example: 609c5f0c1d2a3e4f56789def
 *         url:
 *           type: string
 *           description: URL de la red social
 *           example: https://instagram.com/usuario
 */
