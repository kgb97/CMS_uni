import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../../chatbot/knowledge-base';

export const Divisiones: CollectionConfig = {
  slug: 'divisiones',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  labels: {
    singular: 'División',
    plural: 'Divisiones',
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
      name: 'cargos',
      type: 'relationship',
      relationTo: 'cargos',
      hasMany: true,
      required: true,
    },
  ],
};

export default Divisiones;
