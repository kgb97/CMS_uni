import { CollectionConfig } from 'payload/types';

const NuestrosCanales: CollectionConfig = {
  slug: 'nuestros-canales',
  access: {
    read: () => true, // Público
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'descripcionCorta', type: 'text', required: true },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'enlace', type: 'text', required: true },
      ],
    },
  ],
};

export default NuestrosCanales;
