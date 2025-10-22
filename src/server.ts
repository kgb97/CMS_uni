import express from 'express'
import payload from 'payload'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
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
  },
  // Resolver rutas para dev y prod
  apis: [
    path.join(process.cwd(), 'src', 'swagger', '**', '*.ts'), // dev
    path.join(__dirname, 'swagger', '**', '*.js'),             // por si se transpila
    path.join(__dirname, '..', 'src', 'swagger', '**', '*.ts') // prod con src copiado
  ],
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
      // trainBot ya se ejecuta en payload.config.ts, no duplicar aquí
    },
  });

  // Add your own express routes here
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    payload.logger.info(`Servidor en http://localhost:${PORT}`);
    payload.logger.info(`Swagger UI en http://localhost:${PORT}/swagger`);
  });
}

start()
