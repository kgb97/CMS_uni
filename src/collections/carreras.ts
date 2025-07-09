import { CollectionConfig } from 'payload/types';
import { trainBot } from '../lib/training'

const Carreras: CollectionConfig = {
  slug: 'carreras',
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
      afterChange: [async ({ req }) => await trainBot(req.payload)],
      afterDelete: [async ({ req }) => await trainBot(req.payload)],
    },
};

export default Carreras;
