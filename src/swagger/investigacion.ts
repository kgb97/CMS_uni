/**
 * @openapi
 * /api/investigaciones:
 *   get:
 *     tags:
 *       - Investigaciones
 *     summary: Listar investigaciones
 *     description: Obtiene todos los proyectos de investigación
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de investigaciones
 * 
 * /api/investigacion-area:
 *   get:
 *     tags:
 *       - Investigaciones
 *     summary: Listar áreas de investigación
 *     responses:
 *       200:
 *         description: Lista de áreas
 * 
 * /api/posgrado:
 *   get:
 *     tags:
 *       - Posgrado
 *     summary: Listar programas de posgrado
 *     description: Obtiene maestrías y doctorados
 *     responses:
 *       200:
 *         description: Lista de programas
 * 
 * /api/posgrado/{id}:
 *   get:
 *     tags:
 *       - Posgrado
 *     summary: Obtener programa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Programa encontrado
 */

export {}
