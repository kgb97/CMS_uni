// src/collections/Media.ts
import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  access: {
    read: () => true, // Público
  },
  slug: 'media',
  upload: {
    staticDir: 'media',
    staticURL: '/media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'filename',
  },
  fields: [],
};

export default Media;
