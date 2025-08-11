import { CollectionConfig } from 'payload/types';
import { extractTextFromRichText } from '../../utils/extractTextFromRichText';

export const Cargos: CollectionConfig = {
  slug: 'cargos',
  labels: {
    singular: 'Cargo',
    plural: 'Cargos',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombreCargo',
      type: 'text',
      required: true,
    },
    {
      name: 'fotoEncargado',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'nombreEncargado',
      type: 'text',
      required: false,
    },
    {
      name: 'correoEncargado',
      type: 'email',
      required: false,
    },
    {
      name: 'descripcionCargo',
      type: 'richText',
      required: true,
    },
    {
      name: 'descripcionPlano',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
        async ({ doc, previousDoc, req, operation }) => {
        try {
            console.log('[afterChange] Hook iniciado para doc ID:', doc.id);

            // Verificar que existe el campo richText y que es diferente del anterior
            if (!doc?.descripcionCargo) {
                console.log('[afterChange] No existe descripcionCargo, saliendo...');
                return doc;
            }

            if (
                previousDoc &&
                JSON.stringify(previousDoc.descripcionCargo) === JSON.stringify(doc.descripcionCargo)
            ) {
                console.log('[afterChange] descripcionCargo sin cambios, saliendo...');
                return doc;
            }

            // Extraer texto plano
            console.log('[afterChange] Contenido raw de descripcionCargo:', JSON.stringify(doc.descripcionCargo, null, 2));
            const textoPlano = extractTextFromRichText(doc.descripcionCargo);
            console.log('[afterChange] Texto plano extraído:', textoPlano);
           

            // Evitar actualizar si ya está igual para no hacer loops
            if (doc.descripcionPlano === textoPlano) {
            console.log('[afterChange] descripcionPlano ya actualizado, saliendo...');
            return doc;
            }

            // Actualizar campo descripcionPlano con overrideAccess
            await req.payload.update({
            collection: 'cargos',
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

export default Cargos;
