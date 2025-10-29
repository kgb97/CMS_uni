import { CollectionConfig } from 'payload/types';

const Recintos: CollectionConfig = {
  slug: 'recintos',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
    },
    {
      name: 'telefonos',
      label: 'Teléfonos',
      type: 'array',
      fields: [
        {
          name: 'telefono',
          label: 'Teléfono',
          type: 'text',
          admin: {
            placeholder: '+505 1234 5678',
          },
        },
      ],
    },
    {
      name: 'telefaxes',
      label: 'Telefaxes',
      type: 'array',
      fields: [
        {
          name: 'telefax',
          label: 'Telefax',
          type: 'text',
          admin: {
            placeholder: '+505 1234 5678',
          },
        },
      ],
    },
    {
      name: 'apartadoPostal',
      label: 'Apartado Postal',
      type: 'text',
    },
    {
      name: 'fotos',
      label: 'Fotos',
      type: 'array',
      fields: [
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Texto alternativo (alt)',
          type: 'text',
        },
        {
          name: 'principal',
          label: 'Foto principal',
          type: 'checkbox',
          admin: {
            description: 'Marca esta foto como principal',
          },
        },
      ],
    },
  ],
};

export default Recintos;
