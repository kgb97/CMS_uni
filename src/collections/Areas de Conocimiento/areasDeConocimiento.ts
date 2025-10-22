import { CollectionConfig } from 'payload/types';
import { trainBot } from '../../lib/training'
import { extractTextFromRichText } from '../../utils/extractTextFromRichText';

const AreasDeConocimiento: CollectionConfig = {
  slug: 'areas-de-conocimiento',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Área de Conocimiento',
    plural: 'Áreas de Conocimiento',
  },
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'richText',
    },
    {
      name: 'descripcionplano',
      label: 'Descripción Plano',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'carrerasRelacionadas',
      label: 'Carreras Relacionadas',
      type: 'relationship',
      relationTo: 'carrera',
      hasMany: true, // muchas carreras por área
    },
  ],
  hooks: {
    afterChange: [async ({ req }) => await trainBot(req.payload),
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
            collection: 'areas-de-conocimiento',
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
    afterDelete: [async ({ req }) => await trainBot(req.payload)],
  },
};

export default AreasDeConocimiento;

