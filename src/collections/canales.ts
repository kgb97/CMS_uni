// src/collections/Canales.js
import { CollectionConfig } from 'payload/types';

export const Canales: CollectionConfig = {
  slug: 'canales',
  labels: {
    singular: 'Canal',
    plural: 'Canales',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'icono',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default Canales;