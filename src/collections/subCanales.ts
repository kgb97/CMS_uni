// src/collections/SubCanales.js
import { Export } from 'devextreme-react/bar-gauge';
import { CollectionConfig } from 'payload/types';
import { Canales } from './canales';

export const SubCanales: CollectionConfig = {
  slug: 'subCanales',
  labels: {
    singular: 'SubCanal',
    plural: 'SubCanales',
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
    {
      name: 'canalPrincipal',
      type: 'relationship',
      relationTo: 'canales',
      required: true,
    },
  ],
};

export default SubCanales;