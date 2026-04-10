import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../chatbot/knowledge-base';

const Posgrado: CollectionConfig = {
  slug: 'posgrado',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'text',
      required: true,
    },
    {
      name: 'enlace',
      type: 'text',
      required: false,
      validate: (value) => {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return 'Debe ser una URL válida';
        }
      },
    },
  ],
};

export default Posgrado;
