import { CollectionConfig } from 'payload/types';

const Historial: CollectionConfig = {
  slug: 'historial',
  access: {
    read: () => true, // cualquiera puede leer (ajusta según tu seguridad)
  },
  fields: [
    { name: 'pregunta', type: 'text', required: true },
    { name: 'respuesta', type: 'text', required: true },
    { name: 'coleccionOrigen', type: 'text' },
    { name: 'documentoId', type: 'text' },
    {
      name: 'fecha',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
};

export default Historial;
