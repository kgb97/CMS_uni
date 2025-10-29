/**
 * @openapi
 * /api/media:
 *   get:
 *     tags:
 *       - Media
 *     summary: Listar archivos de media
 *     description: Obtiene todos los archivos subidos (imágenes, PDFs, etc.)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: where[mimeType][like]
 *         schema:
 *           type: string
 *         description: Filtrar por tipo MIME (ej. "image/")
 *     responses:
 *       200:
 *         description: Lista de archivos
 * 
 * /api/media/{id}:
 *   get:
 *     tags:
 *       - Media
 *     summary: Obtener archivo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archivo encontrado
 * 
 * /api/canales:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Listar canales de comunicación
 *     responses:
 *       200:
 *         description: Lista de canales
 * 
 * /api/subCanales:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Listar subcanales
 *     responses:
 *       200:
 *         description: Lista de subcanales
 * 
 * /api/redesSociales:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Obtener redes sociales
 *     responses:
 *       200:
 *         description: Redes sociales
 * 
 * /api/footer:
 *   get:
 *     tags:
 *       - Multimedia
 *     summary: Obtener contenido del footer
 *     responses:
 *       200:
 *         description: Contenido del footer
 */

export {}
