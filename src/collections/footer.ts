import { CollectionConfig } from 'payload/types';

const Footer: CollectionConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'titulo',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'contacto',
      type: 'relationship',
      relationTo: 'contactanos',
      required: true,
      hasMany: false,
    },
  ],
};

export default Footer;
