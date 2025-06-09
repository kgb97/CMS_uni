/**
 * @openapi
 * tags:
 *   - name: Footer
 *     description: Información del pie de página del sitio
 */

/**
 * @openapi
 * /api/footer:
 *   get:
 *     tags:
 *       - Footer
 *     summary: Obtener todas las entradas de footer
 *     responses:
 *       200:
 *         description: Lista de entradas de footer
 *   post:
 *     tags:
 *       - Footer
 *     summary: Crear una nueva entrada de footer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - contacto
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               contacto:
 *                 type: string
 *                 description: ID de la relación con Contactanos
 *     responses:
 *       201:
 *         description: Entrada de footer creada
 */

/**
 * @openapi
 * /api/footer/{id}:
 *   get:
 *     tags:
 *       - Footer
 *     summary: Obtener una entrada de footer por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrada encontrada
 *   patch:
 *     tags:
 *       - Footer
 *     summary: Actualizar una entrada de footer
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
 *               descripcion:
 *                 type: string
 *               contacto:
 *                 type: string
 *                 description: ID de la relación con Contactanos
 *     responses:
 *       200:
 *         description: Entrada de footer actualizada
 *   delete:
 *     tags:
 *       - Footer
 *     summary: Eliminar una entrada de footer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Entrada eliminada correctamente
 */
