/**
 * @openapi
 * tags:
 *   - name: Calendario Académico
 *     description: Gestión de calendarios académicos por año en formato PDF.
 */

/**
 * @openapi
 * /api/calendarioAcademico:
 *   get:
 *     tags:
 *       - Calendario Académico
 *     summary: Obtener todos los calendarios académicos
 *     responses:
 *       200:
 *         description: Lista de calendarios académicos
 *   post:
 *     tags:
 *       - Calendario Académico
 *     summary: Crear un nuevo calendario académico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - archivo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Calendario 2025
 *               archivo:
 *                 type: string
 *                 description: ID del archivo PDF en la colección "media"
 *                 example: 64f3a2c6b92f23001a2d4567
 *     responses:
 *       201:
 *         description: Calendario académico creado correctamente
 */

/**
 * @openapi
 * /api/calendarioAcademico/{id}:
 *   get:
 *     tags:
 *       - Calendario Académico
 *     summary: Obtener un calendario académico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calendario académico encontrado
 *   patch:
 *     tags:
 *       - Calendario Académico
 *     summary: Actualizar un calendario académico existente
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
 *               titulo:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 description: ID del archivo PDF en "media"
 *     responses:
 *       200:
 *         description: Calendario académico actualizado correctamente
 *   delete:
 *     tags:
 *       - Calendario Académico
 *     summary: Eliminar un calendario académico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Calendario académico eliminado correctamente
 */
