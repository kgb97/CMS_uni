import { CollectionConfig } from 'payload/types';

const Noticias: CollectionConfig = {
  slug: 'noticias',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'fecha'],
  },
  timestamps: true, // agrega createdAt y updatedAt
  fields: [
    { name: 'nombre', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigable para la noticia',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'descripcionCorta', type: 'textarea', required: true },
    { name: 'fecha', type: 'date', required: true,defaultValue: () => new Date() },
    { name: 'descripcionLarga', type: 'richText', required: true },
    { name: 'autor', type: 'text', required: false },
  ],
};

export default Noticias;
