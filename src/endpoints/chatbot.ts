import { Endpoint } from 'payload/config';
import { getBestResponses } from '../lib/training';
import { extractTextFromRichText } from '../utils/extractTextFromRichText';
import collectionsMap from '../collections/bot';
import { ChatbotRequestSchema } from '../validators/chatbot';
import { marked } from 'marked';

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

              const relacionadosFiltrados = relacionados.filter((rel): rel is any => !!rel);

              // Si son carreras relacionadas, mostrar con más detalle (nombre + descripción)
              if (relatedCollection === 'carrera' && relacionadosFiltrados.length > 0) {
                const carrerasDetalle = relacionadosFiltrados.map(carrera => {
                  let detalle = `- **${carrera.nombre || 'Sin nombre'}**`;

                  if (carrera.descripcion) {
                    let desc = '';
                    if (Array.isArray(carrera.descripcion) && carrera.descripcion.length > 0) {
                      desc = extractTextFromRichText(carrera.descripcion);
                    } else if (typeof carrera.descripcion === 'string') {
                      desc = carrera.descripcion;
                    }
                    if (desc) {
                      const descCorta = desc.length > 150 ? desc.substring(0, 150) + '...' : desc;
                      detalle += `\n  ${descCorta}`;
                    }
                  }

                  return detalle;
                });

                relacionesTextoArr.push(`**${field.label}:**\n${carrerasDetalle.join('\n\n')}`);
              } else {
                // Para otras relaciones, mostrar solo nombres
                const nombres = relacionadosFiltrados.map(rel => rel.nombre || rel.title || 'Sin nombre');
                relacionesTextoArr.push(`**${field.label}:**\n${nombres.map(n => `- ${n}`).join('\n')}`);
              }
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

      // Unir todas las secciones sin separadores para una respuesta continua
      const respuestaFinal = respuestasArr.join('\n\n');

      // Convertir Markdown a HTML y compactar (sin saltos de línea)
      const respuestaHTML = await marked(respuestaFinal);
      const respuestaCompacta = (typeof respuestaHTML === 'string'
        ? respuestaHTML
        : String(respuestaHTML)
      )
        .replace(/[\r\n]+/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();

            // Interfaz para el resultado expandido
      interface ExpandedResult {
        collection: string;
        documentId: string;
        nombre?: string;
        titulo?: string;
        [key: string]: any;
      }

      // Mapeo de colecciones a sus campos de relación
      type RelationMap = {
        [collection: string]: Array<{
          field: string;
          targetCollection: string;
        }>;
      };

      const relationFieldsMap: RelationMap = {
        'areas-de-conocimiento': [
          { field: 'carrerasRelacionadas', targetCollection: 'carrera' }
          // Agregar más relaciones si es necesario
        ]
        // Agregar más colecciones con sus relaciones
      };
      
      const allResultsExpanded: ExpandedResult[] = [];
      
      for (const result of results) {
        // Agregar el documento principal
        const mainDoc: ExpandedResult = {
          collection: result.source,
          documentId: String(result.id)
        };

        // Obtener el documento completo para acceder a todos sus campos
        try {
          const fullDoc = await req.payload.findByID({
            collection: result.source,
            id: String(result.id),
            depth: 1
          });

          // Agregar campos comunes si existen
          if (fullDoc) {
            if ('titulo' in fullDoc && fullDoc.titulo) {
              mainDoc.titulo = String(fullDoc.titulo);
            }
            if ('nombre' in fullDoc && fullDoc.nombre) {
              mainDoc.nombre = String(fullDoc.nombre);
            }
          }
        } catch (error) {
          console.warn(`Error al cargar documento ${result.source} ${result.id}:`, error);
        }

        allResultsExpanded.push(mainDoc);
        
        // Procesar relaciones si existen para esta colección
        const relations = relationFieldsMap[result.source];
        if (relations) {
          try {
            const doc = await req.payload.findByID({ 
              collection: result.source, 
              id: String(result.id), 
              depth: 1 
            });
            
            for (const rel of relations) {
              const relationField = doc?.[rel.field];
              if (Array.isArray(relationField)) {
                const relatedIds = relationField
                  .map((item: any) => obtenerIdRelacion(item))
                  .filter((id): id is string => Boolean(id));
                  
                for (const relatedId of relatedIds) {
                  try {
                    const relatedDoc = await req.payload.findByID({ 
                      collection: rel.targetCollection, 
                      id: String(relatedId), 
                      depth: 0 
                    });
                    
                    if (relatedDoc) {
                      const relatedResult: ExpandedResult = {
                        collection: rel.targetCollection,
                        documentId: String(relatedDoc.id)
                      };

                      if ('titulo' in relatedDoc && relatedDoc.titulo) {
                        relatedResult.titulo = String(relatedDoc.titulo);
                      }
                      if ('nombre' in relatedDoc && relatedDoc.nombre) {
                        relatedResult.nombre = String(relatedDoc.nombre);
                      }

                      allResultsExpanded.push(relatedResult);
                    }
                  } catch (error) {
                    console.warn(`Error al cargar ${rel.targetCollection} ${relatedId}:`, error);
                  }
                }
              }
            }
          } catch (error) {
            console.warn(`Error al expandir relaciones de ${result.source} ${result.id}:`, error);
          }
        }
      }

      return res.json({
        response: respuestaCompacta,
        collection: results[0].source,
        documentId: String(results[0].id), // Aseguramos que sea string
        allResults: allResultsExpanded,
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
