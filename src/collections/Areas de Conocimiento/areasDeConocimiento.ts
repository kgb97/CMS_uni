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
      type: 'richText',
    },
    {
      name: 'carrerasRelacionadas',
      label: 'Carreras Relacionadas',
      type: 'relationship',
      relationTo: 'carrera',
      hasMany: true, // muchas carreras por área
    },
  ],
};

export default AreasDeConocimiento;

