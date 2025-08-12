import { CollectionConfig } from 'payload/types';
import { trainBot } from '../../lib/training'
import { extractTextFromRichText } from '../../utils/extractTextFromRichText';

const Carreras: CollectionConfig = {
  slug: 'carrera',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Carrera',
    plural: 'Carreras',
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
      required: true,
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
      name: 'imagenes',
      label: 'Imágenes',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'urlPerfilAcademico',
      label: 'URL al perfil académico',
      type: 'text',
    },
  ],
  hooks: {      
      afterChange: [async ({ req }) => await trainBot(req.payload),
        async ({ doc, previousDoc, req, operation }) => {
  try {
    console.log('[afterChange] Hook iniciado para doc ID:', doc.id);

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

    const textoPlano = extractTextFromRichText(doc.descripcion);
    console.log('[afterChange] Texto plano extraído:', textoPlano);

    if (doc.descripcionplano === textoPlano) {
      console.log('[afterChange] descripcionplano ya actualizado, saliendo...');
      return doc;
    }

    await req.payload.update({
      collection: 'carrera',
      id: doc.id,
      data: {
        descripcionplano: textoPlano,
      },
      overrideAccess: true,
    });

    console.log('[afterChange] descripcionplano actualizado correctamente');
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

export default Carreras;
