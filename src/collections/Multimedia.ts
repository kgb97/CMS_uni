import { CollectionConfig } from 'payload/types';

const Multimedia: CollectionConfig = {
  slug: 'multimedia',
  access: {
    read: () => true, // Público
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    { name: 'titulo', type: 'text', required: true },
    {
      name: 'enlaceYoutube',
      type: 'text',
      label: 'Enlace de YouTube',
      required: false,
    },
    {
      name: 'imagenes',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      required: false,
    },
  ],
};

export default Multimedia;
