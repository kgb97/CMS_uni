/**
 * @openapi
 * /api/organizacionUNI:
 *   get:
 *     tags:
 *       - Organización
 *     summary: Obtener estructura organizacional
 *     responses:
 *       200:
 *         description: Estructura organizacional
 * 
 * /api/cargos:
 *   get:
 *     tags:
 *       - Organización
 *     summary: Listar cargos
 *     description: Obtiene todos los cargos y autoridades
 *     responses:
 *       200:
 *         description: Lista de cargos
 * 
 * /api/divisiones:
 *   get:
 *     tags:
 *       - Organización
 *     summary: Listar divisiones
 *     responses:
 *       200:
 *         description: Lista de divisiones
 * 
 * /api/recintos:
 *   get:
 *     tags:
 *       - Recintos
 *     summary: Listar recintos
 *     description: Obtiene todos los campus y sedes universitarias
 *     responses:
 *       200:
 *         description: Lista de recintos
 * 
 * /api/recintos/{id}:
 *   get:
 *     tags:
 *       - Recintos
 *     summary: Obtener recinto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recinto encontrado
 */

export {}
