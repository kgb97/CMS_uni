/**
 * @openapi
 * /api/contactanos:
 *   get:
 *     tags:
 *       - Contacto
 *     summary: Obtener información de contacto
 *     responses:
 *       200:
 *         description: Información de contacto
 * 
 * /api/multimedia:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Listar contenido multimedia
 *     parameters:
 *       - in: query
 *         name: where[tipo][equals]
 *         schema:
 *           type: string
 *           enum: [video, galeria, audio]
 *     responses:
 *       200:
 *         description: Lista de contenido multimedia
 * 
 * /api/inicio:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Obtener contenido de inicio
 *     responses:
 *       200:
 *         description: Contenido de inicio
 * 
 * /api/estadisticas:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Obtener estadísticas
 *     responses:
 *       200:
 *         description: Estadísticas
 * 
 * /api/calendarioAcademico:
 *   get:
 *     tags:
 *       - Contacto
 *     summary: Obtener calendario académico
 *     responses:
 *       200:
 *         description: Calendario académico
 * 
 * /api/comunicados:
 *   get:
 *     tags:
 *       - Contacto
 *     summary: Listar comunicados
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-fecha"
 *     responses:
 *       200:
 *         description: Lista de comunicados
 */

export {}
