import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../../chatbot/knowledge-base';

const Investigaciones: CollectionConfig = {
  slug: 'investigaciones',
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
      name: 'icono',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'descripcion',
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
};

export default Investigaciones;
