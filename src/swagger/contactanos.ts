/**
 * @openapi
 * tags:
 *   - name: Contáctanos
 *     description: Información de contacto institucional
 */

/**
 * @openapi
 * /api/contactanos:
 *   get:
 *     tags:
 *       - Contáctanos
 *     summary: Obtener todas las entradas de contacto
 *     responses:
 *       200:
 *         description: Lista de entradas de contacto
 *   post:
 *     tags:
 *       - Contáctanos
 *     summary: Crear una nueva entrada de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ubicacion
 *               - localidad
 *             properties:
 *               ubicacion:
 *                 type: string
 *               apartadoPostal:
 *                 type: string
 *               localidad:
 *                 type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       example: "+505 1234 5678"
 *               telefaxes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefax:
 *                       type: string
 *                       example: "+505 1234 5678"
 *               correos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     correo:
 *                       type: string
 *                       format: email
 *     responses:
 *       201:
 *         description: Entrada de contacto creada
 */

/**
 * @openapi
 * /api/contactanos/{id}:
 *   get:
 *     tags:
 *       - Contáctanos
 *     summary: Obtener una entrada de contacto por ID
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
 *       - Contáctanos
 *     summary: Actualizar una entrada de contacto
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
 *               ubicacion:
 *                 type: string
 *               apartadoPostal:
 *                 type: string
 *               localidad:
 *                 type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *               telefaxes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefax:
 *                       type: string
 *               correos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     correo:
 *                       type: string
 *                       format: email
 *     responses:
 *       200:
 *         description: Entrada de contacto actualizada
 *   delete:
 *     tags:
 *       - Contáctanos
 *     summary: Eliminar una entrada de contacto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Entrada de contacto eliminada correctamente
 */
