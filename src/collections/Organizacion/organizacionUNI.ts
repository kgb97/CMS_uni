import { CollectionConfig } from 'payload/types';

export const OrganizacionUNI: CollectionConfig = {
  slug: 'organizacionUNI',
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
