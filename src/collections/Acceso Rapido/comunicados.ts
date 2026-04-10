// src/collections/Comunicados.ts
import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../../chatbot/knowledge-base';

export const Comunicados: CollectionConfig = {
  slug: 'comunicados',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  labels: {
    singular: 'Comunicado',
    plural: 'Comunicados',
  },
  access: {
    read: () => true, // Público
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      label: 'Enlace',
      type: 'text',
      required: true,
    },
  ],
};

export default Comunicados;
