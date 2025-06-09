import { CollectionConfig } from 'payload/types';

const Posgrado: CollectionConfig = {
  slug: 'posgrado',
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
      type: 'textarea',
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
