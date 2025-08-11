/**
 * @openapi
 * components:
 *   schemas:
 *     RedesSociales:
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
 *           format: binary
 *           description: Icono de la red social
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
 *           format: binary
 *           description: Icono de la red social
 *         url:
 *           type: string
 *           description: URL de la red social
 *           example: https://instagram.com/usuario
 */