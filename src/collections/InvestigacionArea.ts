import { CollectionConfig } from 'payload/types';

const InvestigacionArea: CollectionConfig = {
  slug: 'investigacion-area',
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'investigaciones',
      label: 'Investigaciones relacionadas',
      type: 'array',
      fields: [
        {
          name: 'investigacion',
          type: 'relationship',
          relationTo: 'investigaciones',
          required: true,
        },
      ],
    },
  ],
};

export default InvestigacionArea;
