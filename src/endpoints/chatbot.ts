import { Endpoint } from 'payload/config';
import { getBestResponses } from '../lib/training';
import { extractTextFromRichText } from '../utils/extractTextFromRichText';
import collectionsMap from '../collections/bot';
import { ChatbotRequestSchema } from '../validators/chatbot';

// Función auxiliar para obtener ID de relaciones
const obtenerIdRelacion = (fieldValue: any): string | null => {
  if (typeof fieldValue === 'string') return fieldValue;
  if (fieldValue && typeof fieldValue === 'object') {
    if ('id' in fieldValue && typeof fieldValue.id === 'string') return fieldValue.id;
    if ('value' in fieldValue && typeof fieldValue.value === 'string') return fieldValue.value;
  }
  return null;
};

const ChatbotEndpoint: Endpoint = {
  path: '/chatbot',
  method: 'post',
  handler: async (req, res) => {
    try {

      // Validar el request con Zod
      const validation = ChatbotRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validación fallida',
          details: validation.error.errors.map(e => e.message)
        });
      }

      const { pregunta, message } = validation.data;
      const text = (pregunta || message)!;

      const results = await getBestResponses(text);

      if (!results.length) {
        return res.json({ response: 'No encontré información relacionada a tu consulta. Por favor, intenta reformular tu pregunta.' });
      }

      const respuestasArr: string[] = [];

      for (const result of results) {
        const documento = await req.payload.findByID({
          collection: result.source,
          id: result.id,
          depth: 1,
        });

        if (!documento) continue;

        const collectionConfig = collectionsMap[result.source];
        if (!collectionConfig) continue;

        const relationshipFields = collectionConfig.fields.filter(
          (field: any) => field.type === 'relationship'
        );

        const relacionesTextoArr: string[] = [];

        for (const field of relationshipFields) {
          const fieldName = field.name;
          const relatedCollection = Array.isArray(field.relationTo)
            ? field.relationTo[0]
            : field.relationTo;

          const fieldValue = documento[fieldName];
          if (!fieldValue) continue;

          if (field.hasMany) {
            if (Array.isArray(fieldValue)) {
              const ids = fieldValue
                .map(obtenerIdRelacion)
                .filter((id): id is string => !!id);

              if (ids.length === 0) continue;

              const relacionados = await Promise.all(
                ids.map(id =>
                  req.payload.findByID({ collection: relatedCollection, id, depth: 1 }).catch(() => null)
                )
              );

              const nombres = relacionados
                .filter((rel): rel is any => !!rel)
                .map(rel => rel.nombre || rel.title || 'Sin nombre');

              // Markdown para listas
              relacionesTextoArr.push(`**${field.label}:**\n${nombres.map(n => `- ${n}`).join('\n')}`);
            }
          } else {
            const id = obtenerIdRelacion(fieldValue);
            if (!id) continue;

            try {
              const relacionado = await req.payload.findByID({ collection: relatedCollection, id, depth: 1 });
              const nombre = relacionado?.nombre || relacionado?.title || 'Sin nombre';
              relacionesTextoArr.push(`**${field.label}:** ${nombre}`);
            } catch (error) {
              console.warn(`⚠️  No se pudo cargar relación ${field.label} (ID: ${id}):`, error);
            }
          }
        }

        let descripcionPlano = '';
        if (Array.isArray(documento.descripcion) && documento.descripcion.length && documento.descripcion[0].children) {
          descripcionPlano = extractTextFromRichText(documento.descripcion);
        } else if (typeof documento.descripcion === 'string') {
          descripcionPlano = documento.descripcion;
        }

        // Obtener el título/nombre según la colección
        const titulo = documento.nombre || documento.titulo || documento.title || 'Información';

        respuestasArr.push(
          `### 🔎 ${titulo}\n\n${descripcionPlano}\n\n${relacionesTextoArr.join('\n\n')}`
        );
      }

      const respuestaFinal = respuestasArr.join('\n\n---\n\n');

      // Enviar Content-Type adecuado para markdown
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');

      return res.json({
        response: respuestaFinal,
        collection: results[0].source,
        documentId: results[0].id,
        allResults: results.map(r => ({ collection: r.source, documentId: r.id })),
      });
    } catch (error) {
      console.error('❌ Error en endpoint del chatbot:', error);
      return res.status(500).json({ 
        error: 'Error al procesar la consulta',
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  },
};


export default ChatbotEndpoint;
