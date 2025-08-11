import { CollectionConfig } from 'payload/types';

export const Divisiones: CollectionConfig = {
  slug: 'divisiones',
  labels: {
    singular: 'División',
    plural: 'Divisiones',
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
