import express from 'express'
import payload from 'payload'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { trainBot } from './lib/training';

require('dotenv').config()
const app = express()

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API UNI WEB',
      version: '1.0.0',
    },
    // servers: [
    //   {
    //     url: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    //   },
    // ],
  },
  apis: ['./src/swagger/**/*.ts'], // puedes cambiar esto para documentar rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Ruta Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      await trainBot(payload); 
    },
    
  });
  app.listen(3001, () => {
    payload.logger.info(`Servidor en http://localhost:3000`);
    payload.logger.info(`Swagger UI en http://localhost:3001/swagger`);
  });

  // Add your own express routes here

  app.listen(3000)
}

start()
