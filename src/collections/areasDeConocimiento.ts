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
};

export default AreasDeConocimiento;
