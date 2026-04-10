import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../chatbot/knowledge-base';

const Extension: CollectionConfig = {
  slug: 'extension',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'text',
      required: true,
    },
    {
      name: 'programas',
      type: 'array',
      fields: [
        {
          name: 'nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
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
    },
  ],
};

export default Extension;
