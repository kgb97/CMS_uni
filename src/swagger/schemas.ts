/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Error en la solicitud"
 *     
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         docs:
 *           type: array
 *           items:
 *             type: object
 *         totalDocs:
 *           type: integer
 *           example: 50
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 5
 *         page:
 *           type: integer
 *           example: 1
 *         pagingCounter:
 *           type: integer
 *           example: 1
 *         hasPrevPage:
 *           type: boolean
 *           example: false
 *         hasNextPage:
 *           type: boolean
 *           example: true
 *         prevPage:
 *           type: integer
 *           nullable: true
 *           example: null
 *         nextPage:
 *           type: integer
 *           nullable: true
 *           example: 2
 *     
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64a1b2c3d4e5f6g7h8i9j0k1"
 *         filename:
 *           type: string
 *           example: "imagen-universidad.jpg"
 *         mimeType:
 *           type: string
 *           example: "image/jpeg"
 *         filesize:
 *           type: integer
 *           example: 245678
 *         width:
 *           type: integer
 *           example: 1920
 *         height:
 *           type: integer
 *           example: 1080
 *         url:
 *           type: string
 *           example: "http://localhost:3000/media/imagen-universidad.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export {}
