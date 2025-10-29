/**
 * @openapi
 * /api/areas-de-conocimiento:
 *   get:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Listar áreas de conocimiento
 *     description: Obtiene todas las facultades y departamentos académicos
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: depth
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nivel de profundidad para relaciones (0-10)
 *     responses:
 *       200:
 *         description: Lista de áreas de conocimiento
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
 *                             example: "Ingeniería y Arquitectura"
 *                           descripcion:
 *                             type: array
 *                             items:
 *                               type: object
 *                           carrerasRelacionadas:
 *                             type: array
 *                             items:
 *                               oneOf:
 *                                 - type: string
 *                                 - type: object
 * 
 * /api/areas-de-conocimiento/{id}:
 *   get:
 *     tags:
 *       - Áreas de Conocimiento
 *     summary: Obtener área por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: depth
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Área encontrada
 *       404:
 *         description: Área no encontrada
 * 
 * /api/carrera:
 *   get:
 *     tags:
 *       - Carreras
 *     summary: Listar carreras
 *     description: Obtiene todos los programas académicos de pregrado
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: where[nombre][like]
 *         schema:
 *           type: string
 *         description: Buscar por nombre de carrera
 *     responses:
 *       200:
 *         description: Lista de carreras
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
 *                             example: "Ingeniería en Sistemas"
 *                           descripcion:
 *                             type: array
 *                           imagenes:
 *                             type: array
 *                           urlPerfilAcademico:
 *                             type: string
 * 
 * /api/carrera/{id}:
 *   get:
 *     tags:
 *       - Carreras
 *     summary: Obtener carrera por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *       404:
 *         description: Carrera no encontrada
 */

export {}
