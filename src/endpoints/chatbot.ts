import { Endpoint } from 'payload/config';
import { getBestResponse } from '../lib/training';

const ChatbotEndpoint: Endpoint = {
  path: '/chatbot',
  method: 'post',
  handler: async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Mensaje vacío' });

    const result = getBestResponse(message);

    const respuesta = result
      ? `🔎 ${result.text}`
      : 'No encontré información relacionada.';

    // Guardar en historial
    await req.payload.create({
      collection: 'historial',
      data: {
        pregunta: message,
        respuesta,
        coleccionOrigen: result?.source || '',
        documentoId: result?.id || '',
      },
    });

    return res.json({
      response: respuesta,
      collection: result?.source,
      documentId: result?.id,
    });
  },
};

export default ChatbotEndpoint;
