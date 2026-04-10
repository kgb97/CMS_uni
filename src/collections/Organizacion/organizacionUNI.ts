import { CollectionConfig } from 'payload/types';
import { invalidateKnowledgeCache } from '../../chatbot/knowledge-base';

export const OrganizacionUNI: CollectionConfig = {
  slug: 'organizacionUNI',
  hooks: {
    afterChange: [() => { invalidateKnowledgeCache(); }],
    afterDelete: [() => { invalidateKnowledgeCache(); }],
  },
  labels: {
    singular: 'Organización UNI',
    plural: 'Organizaciones UNI',
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
      name: 'descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'divisiones',
      type: 'relationship',
      relationTo: 'divisiones',
      hasMany: true,
      required: true,
    },
  ],
};

export default OrganizacionUNI;
