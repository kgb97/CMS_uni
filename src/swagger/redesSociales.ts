/**
 * @openapi
 * components:
 *   schemas:
 *     RedSocial:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la red social
 *         nombre:
 *           type: string
 *           description: Nombre de la red social
 *         icono:
 *           type: string
 *           description: ID del archivo en la colección "media"
 *         url:
 *           type: string
 *           description: URL de la red social
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
 *         icono:
 *           type: string
 *           description: ID del archivo en la colección "media"
 *         url:
 *           type: string
 *           description: URL de la red social
 */
