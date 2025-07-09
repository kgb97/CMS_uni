import { CollectionConfig } from 'payload/types';
import { trainBot } from '../lib/training'

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
    { name: 'descripcionCorta', type: 'text', required: true },
    { name: 'fecha', type: 'date', required: true,defaultValue: () => new Date() },
    { name: 'descripcionLarga', type: 'richText', required: true },
    { name: 'autor', type: 'text', required: false },
  ],
  hooks: {
    afterChange: [async ({ req }) => await trainBot(req.payload)],
    afterDelete: [async ({ req }) => await trainBot(req.payload)],
  },
};

export default Noticias;
