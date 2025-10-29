import express from 'express'
import payload from 'payload'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

require('dotenv').config()
const app = express()

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UniWeb API - Universidad Nacional de Ingeniería',
      version: '1.0.0',
      description: 'API REST completa para el CMS de la Universidad Nacional de Ingeniería (UNI)',
      contact: {
        name: 'Equipo de Desarrollo UNI',
        email: 'desarrollo@uni.edu.ni',
      },
    },
    servers: [
      {
        url: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      { name: 'Chatbot', description: 'Chatbot inteligente con IA (OpenAI/Gemini)' },
      { name: 'Noticias', description: 'Consulta de noticias y publicaciones' },
      { name: 'Eventos', description: 'Consulta de eventos universitarios' },
      { name: 'Áreas de Conocimiento', description: 'Facultades y departamentos académicos' },
      { name: 'Carreras', description: 'Programas académicos de pregrado' },
      { name: 'Investigaciones', description: 'Proyectos de investigación' },
      { name: 'Posgrado', description: 'Programas de maestría y doctorado' },
      { name: 'Organización', description: 'Estructura organizacional de la UNI' },
      { name: 'Recintos', description: 'Campus y sedes universitarias' },
      { name: 'Contacto', description: 'Información de contacto' },
      { name: 'Multimedia', description: 'Contenido multimedia' },
      { name: 'Media', description: 'Archivos y medios' },
      { name: 'GraphQL', description: 'Endpoint GraphQL' },
    ],
  },
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Ruta Swagger UI
// @ts-ignore
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'UniWeb API Documentation',
}))

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})
{{ ... }}
const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    payload.logger.info(`Servidor corriendo en http://localhost:${PORT}`);
    payload.logger.info(`Documentación API en http://localhost:${PORT}/api-docs`);
  });
}

start()
