/**
 * @openapi
 * tags:
 *   - name: Documentos de Acceso Rápido
 *     description: Descarga de documentos
 */

/**
 * @openapi
 * /api/documentos-acceso-rapido:
 *   get:
 *     tags:
 *       - Documentos de Acceso Rápido
 *     summary: Obtener documentos
 *     responses:
 *       200:
 *         description: Lista de documentos
 *   post:
 *     tags:
 *       - Documentos de Acceso Rápido
 *     summary: Subir un nuevo documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               archivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Documento subido
 */
