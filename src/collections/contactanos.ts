import { CollectionConfig } from 'payload/types';

const Contactanos: CollectionConfig = {
  slug: 'contactanos',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'ubicacion',
  },
  fields: [
    {
      name: 'ubicacion',
      type: 'text',
      required: true,
    },
    {
      name: 'apartadoPostal',
      type: 'text',
      required: false,
    },
    {
      name: 'localidad',
      type: 'text',
      required: true,
    },
    {
      name: 'telefonos',
      type: 'array',
      fields: [
        {
          name: 'telefono',
          type: 'text',
          required: true,
          admin: { placeholder: '+505 1234 5678' },
        },
      ],
    },
    {
      name: 'telefaxes',
      type: 'array',
      fields: [
        {
          name: 'telefax',
          type: 'text',
          required: true,
          admin: { placeholder: '+505 1234 5678' },
        },
      ],
    },
    {
      name: 'correos',
      type: 'array',
      fields: [
        {
          name: 'correo',
          type: 'email',
          required: true,
        },
      ],
    },
  ],
};

export default Contactanos;
