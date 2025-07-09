import { Endpoint } from 'payload/config';
import { getBestResponses } from '../lib/training';
import { extractTextFromRichText } from '../utils/extractTextFromRichText';
import collectionsMap from '../collections'; // exporta tus configs aquí

const ChatbotEndpoint: Endpoint = {
  path: '/chatbot',
  method: 'post',
  handler: async (req, res) => {
    const { pregunta, message } = req.body;
    const text = pregunta || message;

    if (!text) return res.status(400).json({ error: 'Mensaje vacío' });

    const results = getBestResponses(text);

    if (!results.length) {
      return res.json({ response: 'No encontré información relacionada.' });
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

      function obtenerIdRelacion(fieldValue: any): string | null {
        if (typeof fieldValue === 'string') return fieldValue;
        if (fieldValue && typeof fieldValue === 'object') {
          if ('id' in fieldValue && typeof fieldValue.id === 'string') return fieldValue.id;
          if ('value' in fieldValue && typeof fieldValue.value === 'string') return fieldValue.value;
        }
        return null;
      }

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
          } catch {}
        }
      }

      let descripcionPlano = '';
      if (Array.isArray(documento.descripcion) && documento.descripcion.length && documento.descripcion[0].children) {
        descripcionPlano = extractTextFromRichText(documento.descripcion);
      } else if (typeof documento.descripcion === 'string') {
        descripcionPlano = documento.descripcion;
      }

      respuestasArr.push(
        `### 🔎 ${documento.nombre || 'Información'}\n\n${descripcionPlano}\n\n${relacionesTextoArr.join('\n\n')}`
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
  },
};


export default ChatbotEndpoint;
