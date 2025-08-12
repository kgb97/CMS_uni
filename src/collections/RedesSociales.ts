// src/collections/RedesSociales.ts
import { CollectionConfig } from 'payload/types';

export const RedesSociales: CollectionConfig = {
  slug: 'redesSociales',
  labels: {
    singular: 'Red Social',
    plural: 'Redes Sociales',
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

export default RedesSociales;
