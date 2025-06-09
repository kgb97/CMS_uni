import { CollectionConfig } from 'payload/types';

const DocumentosAccesoRapido: CollectionConfig = {
  access: {
    read: () => true, // Público
  },
  slug: 'documentos-acceso-rapido',
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    { name: 'nombre', type: 'text', required: true },
    {
      name: 'archivo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default DocumentosAccesoRapido;
