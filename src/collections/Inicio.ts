import { extractTextFromRichText } from '../utils/extractTextFromRichText';
import { CollectionConfig } from 'payload/types';

const Inicio: CollectionConfig = {
  slug: 'inicio',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Sección Inicio',
    plural: 'Sección Inicio',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título principal',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'richText',
      required: false,
    },
    {
      name: 'descripcionPlano',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'imagenesFondo',
      label: 'Imágenes de fondo',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Texto alternativo (alt)',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
        async ({ doc, previousDoc, req, operation }) => {
        try {
            console.log('[afterChange] Hook iniciado para doc ID:', doc.id);
  
              // Verificar que existe el campo richText y que es diferente del anterior
              if (!doc?.descripcion) {
                  console.log('[afterChange] No existe descripcion, saliendo...');
                  return doc;
              }
  
              if (
                  previousDoc &&
                  JSON.stringify(previousDoc.descripcion) === JSON.stringify(doc.descripcion)
              ) {
                  console.log('[afterChange] descripcion sin cambios, saliendo...');
                  return doc;
              }
  
              // Extraer texto plano
              console.log('[afterChange] Contenido raw de descripcion:', JSON.stringify(doc.descripcion, null, 2));
              const textoPlano = extractTextFromRichText(doc.descripcion);
              console.log('[afterChange] Texto plano extraído:', textoPlano);
             
  
              // Evitar actualizar si ya está igual para no hacer loops
              if (doc.descripcionPlano === textoPlano) {
              console.log('[afterChange] descripcionPlano ya actualizado, saliendo...');
              return doc;
              }
  
              // Actualizar campo descripcionPlano con overrideAccess
              await req.payload.update({
              collection: 'inicio',
              id: doc.id,
              data: {
                  descripcionPlano: textoPlano,
              },
              overrideAccess: true,
              });
  
              console.log('[afterChange] descripcionPlano actualizado correctamente');
              return doc;
          } catch (error) {
              console.error('[afterChange] Error en hook:', error);
              return doc;
          }
          },
      ],
    },
};

export default Inicio;
