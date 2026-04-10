import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../../chatbot/knowledge-base';

export const Cargos: CollectionConfig = {
  slug: 'cargos',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  labels: {
    singular: 'Cargo',
    plural: 'Cargos',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombreCargo',
      type: 'text',
      required: true,
    },
    {
      name: 'fotoEncargado',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'nombreEncargado',
      type: 'text',
      required: false,
    },
    {
      name: 'correoEncargado',
      type: 'email',
      required: false,
    },
    {
      name: 'descripcionCargo',
      type: 'richText',
      required: true,      
    },
  ],
};

export default Cargos;
