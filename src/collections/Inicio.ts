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
      type: 'text',
      required: false,
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
};

export default Inicio;
