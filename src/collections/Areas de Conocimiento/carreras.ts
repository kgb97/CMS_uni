import { CollectionConfig } from 'payload/types';

const Carreras: CollectionConfig = {
  slug: 'carrera',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Carrera',
    plural: 'Carreras',
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
      required: true,
    },
    {
      name: 'imagenes',
      label: 'Imágenes',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'urlPerfilAcademico',
      label: 'URL al perfil académico',
      type: 'text',
    },
  ],
};

export default Carreras;
