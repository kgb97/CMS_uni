/**
 * @openapi
 * /api/graphql:
 *   post:
 *     tags:
 *       - GraphQL
 *     summary: Endpoint GraphQL
 *     description: Ejecuta consultas GraphQL (solo lectura)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: Consulta GraphQL
 *                 example: |
 *                   query {
 *                     Noticias(limit: 5, sort: "-fecha") {
 *                       docs {
 *                         id
 *                         nombre
 *                         descripcionCorta
 *                         fecha
 *                       }
 *                     }
 *                   }
 *               variables:
 *                 type: object
 *                 example: {}
 *     responses:
 *       200:
 *         description: Respuesta GraphQL exitosa
 *   get:
 *     tags:
 *       - GraphQL
 *     summary: GraphQL Playground
 *     description: Interfaz interactiva para explorar el esquema GraphQL
 *     responses:
 *       200:
 *         description: GraphQL Playground UI
 * 
 * /api/extension:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Listar programas de extensión
 *     responses:
 *       200:
 *         description: Lista de programas
 */

export {}
