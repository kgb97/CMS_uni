import { Payload } from 'payload/dist/payload';
import { CollectionConfig } from 'payload/types';

const AreasDeConocimiento: CollectionConfig = {
  slug: 'areas-de-conocimiento',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Área de Conocimiento',
    plural: 'Áreas de Conocimiento',
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
      type: 'textarea',
    },
    {
      name: 'carrerasRelacionadas',
      label: 'Carreras Relacionadas',
      type: 'relationship',
      relationTo: 'carreras',
      hasMany: true, // muchas carreras por área
    },
  ],
  hooks: {
    afterChange: [async ({ req }) => await trainBot(req.payload)],
    afterDelete: [async ({ req }) => await trainBot(req.payload)],
  },
};

export default AreasDeConocimiento;
function trainBot(payload: Payload): any {
  throw new Error('Function not implemented.');
}

