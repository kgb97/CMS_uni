import { z } from 'zod';

export const ChatbotRequestSchema = z.object({
  pregunta: z.string().min(1, 'La pregunta no puede estar vacía').max(500, 'La pregunta es demasiado larga').optional(),
  message: z.string().min(1, 'El mensaje no puede estar vacío').max(500, 'El mensaje es demasiado largo').optional(),
}).refine(
  (data) => data.pregunta || data.message,
  {
    message: 'Debe proporcionar "pregunta" o "message"',
  }
);

export type ChatbotRequest = z.infer<typeof ChatbotRequestSchema>;

export const ChatbotResponseSchema = z.object({
  response: z.string(),
  collection: z.string().optional(),
  documentId: z.string().optional(),
  allResults: z.array(z.object({
    collection: z.string(),
    documentId: z.string(),
    nombre: z.string().optional(), // Nombre del documento (ej: nombre de carrera)
  })).optional(),
});

export type ChatbotResponse = z.infer<typeof ChatbotResponseSchema>;
