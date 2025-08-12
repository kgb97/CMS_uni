// src/collections/Canales.js
import { CollectionConfig } from 'payload/types';

export const Canales: CollectionConfig = {
  slug: 'canales',
  labels: {
    singular: 'Canal',
    plural: 'Canales',
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
      name: 'sub_Canales',
      label: 'Sub Canales',
      type: 'relationship',
      relationTo: 'subCanales',
      hasMany: true,
    },
  ],
};

export default Canales;