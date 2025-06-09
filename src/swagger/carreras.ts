/**
 * @openapi
 * tags:
 *   - name: Carreras
 *     description: Gestión de carreras académicas.
 */

/**
 * @openapi
 * /api/carreras:
 *   get:
 *     tags:
 *       - Carreras
 *     summary: Obtener todas las carreras
 *     responses:
 *       200:
 *         description: Lista de carreras
 *   post:
 *     tags:
 *       - Carreras
 *     summary: Crear una nueva carrera
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
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imagen:
 *                       type: string
 *                       description: ID del recurso multimedia
 *               urlPerfilAcademico:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carrera creada
 */

/**
 * @openapi
 * /api/carreras/{id}:
 *   get:
 *     tags:
 *       - Carreras
 *     summary: Obtener una carrera por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *   patch:
 *     tags:
 *       - Carreras
 *     summary: Actualizar una carrera
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
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imagen:
 *                       type: string
 *               urlPerfilAcademico:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carrera actualizada
 *   delete:
 *     tags:
 *       - Carreras
 *     summary: Eliminar una carrera
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carrera eliminada correctamente
 */
