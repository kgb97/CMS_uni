import { CollectionConfig } from 'payload/types';

const Eventos: CollectionConfig = {
  slug: 'eventos',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      required: false,
    },
    {
      name: 'fecha',
      label: 'Fecha del evento',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'hora',
      label: 'Hora',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Ejemplo: 18:00 o 6:00 PM',
      },
    },
    {
      name: 'lugar',
      label: 'Lugar',
      type: 'text',
      required: true,
    },
    {
      name: 'imagenes',
      label: 'Imágenes del evento',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'descripcion',
          type: 'text',
          required: false,
          label: 'Descripción de la imagen',
        },
      ],
    },
  ],
};

export default Eventos;
