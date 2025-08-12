import { CollectionConfig } from 'payload/types';

const Estadisticas: CollectionConfig = {
  slug: 'estadisticas',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Estadística',
    plural: 'Estadísticas',
  },
  fields: [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'valor',
      label: 'Valor',
      type: 'text',
      required: true,
    },
  ],
};

export default Estadisticas;
