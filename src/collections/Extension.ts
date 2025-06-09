import { CollectionConfig } from 'payload/types';

const Extension: CollectionConfig = {
  slug: 'extension',
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
