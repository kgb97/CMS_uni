// src/collections/RedesSociales.ts
import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../chatbot/knowledge-base';

export const RedesSociales: CollectionConfig = {
  slug: 'redesSociales',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
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
