/**
 * @openapi
 * tags:
 *   - name: Oferta Académica
 *     description: Programas académicos
 */

/**
 * @openapi
 * /api/oferta-academica:
 *   get:
 *     tags:
 *       - Oferta Académica
 *     summary: Obtener toda la oferta académica
 *     responses:
 *       200:
 *         description: Lista de programas
 *   post:
 *     tags:
 *       - Oferta Académica
 *     summary: Crear un nuevo programa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcionCorta:
 *                 type: string
 *               duracion:
 *                 type: string
 *               descripcionLarga:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Programa creado
 */
