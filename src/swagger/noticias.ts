/**
 * @openapi
 * /api/noticias:
 *   get:
 *     tags:
 *       - Noticias
 *     summary: Listar todas las noticias
 *     description: Obtiene una lista paginada de noticias
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de resultados por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-fecha"
 *         description: Campo por el cual ordenar (- para descendente)
 *       - in: query
 *         name: where[nombre][like]
 *         schema:
 *           type: string
 *         description: Filtrar por nombre (búsqueda parcial)
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginationMeta'
 *                 - type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64a1b2c3d4e5f6g7h8i9j0k1"
 *                           nombre:
 *                             type: string
 *                             example: "Inauguración del nuevo laboratorio de robótica"
 *                           slug:
 *                             type: string
 *                             example: "inauguracion-laboratorio-robotica"
 *                           imagen:
 *                             oneOf:
 *                               - type: string
 *                               - $ref: '#/components/schemas/Media'
 *                           descripcionCorta:
 *                             type: string
 *                             example: "La UNI inaugura un moderno laboratorio de robótica"
 *                           fecha:
 *                             type: string
 *                             format: date
 *                             example: "2025-01-15"
 *                           descripcionLarga:
 *                             type: array
 *                             items:
 *                               type: object
 *                           autor:
 *                             type: string
 *                             example: "Departamento de Comunicación"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 * 
 * /api/noticias/{id}:
 *   get:
 *     tags:
 *       - Noticias
 *     summary: Obtener una noticia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *       404:
 *         description: Noticia no encontrada
 */

export {}
