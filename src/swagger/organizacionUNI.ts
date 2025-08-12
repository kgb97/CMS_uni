/**
 * @openapi
 * /api/organizacionUNI?depth=3:
 *   get:
 *     tags:
 *       - OrganizacionUNI
 *     summary: Obtener todas las organizaciones UNI con relaciones expandidas a profundidad 3
 *     responses:
 *       200:
 *         description: Lista de organizaciones UNI con relaciones expandidas hasta profundidad 3
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64f3a1d8b92f23001a2d4567
 *                   nombre:
 *                     type: string
 *                     example: Organización UNI
 *                   descripcion:
 *                     type: string
 *                     example: Descripción general de la organización UNI
 *                   divisiones:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 64f3a2a1b92f23001a2d4578
 *                         nombre:
 *                           type: string
 *                           example: División Académica
 *                         cargos:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: 64f3a2f4b92f23001a2d4589
 *                               nombreCargo:
 *                                 type: string
 *                                 example: Director
 *                               fotoEncargado:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: 609c5f0c1d2a3e4f56789abc
 *                                   filename:
 *                                     type: string
 *                                     example: foto-director.jpg
 *                                   url:
 *                                     type: string
 *                                     example: https://tu-dominio.com/media/foto-director.jpg
 *                               nombreEncargado:
 *                                 type: string
 *                                 example: Juan Pérez
 *                               correoEncargado:
 *                                 type: string
 *                                 format: email
 *                                 example: juan.perez@example.com
 *                               descripcionCargo:
 *                                 type: string
 *                                 example: Responsable de la división académica
 */
