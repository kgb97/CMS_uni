// src/collections/SubCanales.js
import { CollectionConfig } from 'payload/types';

export const SubCanales: CollectionConfig = {
  slug: 'subCanales',
  labels: {
    singular: 'SubCanal',
    plural: 'SubCanales',
  },
  access: {
    read: () => true,
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
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
};

export default SubCanales;