// src/collections/CalendarioAcademico.js
import { CollectionConfig } from 'payload/types';

export const CalendarioAcademico: CollectionConfig = {
  slug: 'calendarioAcademico',
  labels: {
    singular: 'Calendario Académico',
    plural: 'Calendarios Académicos',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'anho',
      type: 'number',
      required: true,
    },
    {
      name: 'Subtitulo',
      type: 'text',
      required: true,
    },
    {
      name: 'archivo',
      label: 'Archivo PDF',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default CalendarioAcademico;
