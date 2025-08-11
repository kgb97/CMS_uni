/**
 * @openapi
 * tags:
 *   - name: OrganizacionUNI
 *     description: Gestión de la organización UNI, sus divisiones y cargos.
 */

/**
 * @openapi
 * /api/organizacionUNI:
 *   get:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Obtener todas las organizaciones UNI
 *     responses:
 *       200:
 *         description: Lista de organizaciones UNI
 *   post:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Crear una nueva organización UNI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - divisiones
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Organización UNI
 *               descripcion:
 *                 type: string
 *                 example: Descripción general de la organización UNI
 *               divisiones:
 *                 type: array
 *                 description: Lista de divisiones dentro de la organización
 *                 items:
 *                   type: object
 *                   required:
 *                     - nombre
 *                     - cargos
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: División Académica
 *                     cargos:
 *                       type: array
 *                       description: Lista de cargos dentro de la división
 *                       items:
 *                         type: object
 *                         required:
 *                           - nombreCargo
 *                           - fotoEncargado
 *                           - nombreEncargado
 *                           - correoEncargado
 *                           - descripcionCargo
 *                         properties:
 *                           nombreCargo:
 *                             type: string
 *                             example: Director
 *                           fotoEncargado:
 *                             type: string
 *                             description: ID del archivo subido (media)
 *                             example: 609c5f0c1d2a3e4f56789abc
 *                           nombreEncargado:
 *                             type: string
 *                             example: Juan Pérez
 *                           correoEncargado:
 *                             type: string
 *                             format: email
 *                             example: juan.perez@example.com
 *                           descripcionCargo:
 *                             type: string
 *                             example: Responsable de la división académica
 *     responses:
 *       201:
 *         description: Organización UNI creada correctamente
 */

/**
 * @openapi
 * /api/organizacionUNI/{id}:
 *   get:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Obtener una organización UNI por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organización UNI encontrada
 *   patch:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Actualizar una organización UNI
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
 *               divisiones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     cargos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           nombreCargo:
 *                             type: string
 *                           fotoEncargado:
 *                             type: string
 *                           nombreEncargado:
 *                             type: string
 *                           correoEncargado:
 *                             type: string
 *                             format: email
 *                           descripcionCargo:
 *                             type: string
 *     responses:
 *       200:
 *         description: Organización UNI actualizada correctamente
 *   delete:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Eliminar una organización UNI
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Organización UNI eliminada correctamente
 */
