/**
 * @openapi
 * /api/eventos:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Listar todos los eventos
 *     description: Obtiene una lista paginada de eventos universitarios
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-fechaInicio"
 *       - in: query
 *         name: where[fechaInicio][greater_than_equal]
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar eventos desde una fecha
 *     responses:
 *       200:
 *         description: Lista de eventos
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
 *                           nombre:
 *                             type: string
 *                             example: "Feria Tecnológica UNI 2025"
 *                           descripcion:
 *                             type: string
 *                             example: "Exposición de proyectos tecnológicos"
 *                           fechaInicio:
 *                             type: string
 *                             format: date
 *                             example: "2025-03-15"
 *                           fechaFin:
 *                             type: string
 *                             format: date
 *                             example: "2025-03-17"
 *                           ubicacion:
 *                             type: string
 *                             example: "Campus Central UNI"
 *                           imagen:
 *                             oneOf:
 *                               - type: string
 *                               - $ref: '#/components/schemas/Media'
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 * 
 * /api/eventos/{id}:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Obtener un evento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */

export {}
