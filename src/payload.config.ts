import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Noticias from './collections/Noticias'
import Media from './collections/Media' 
import Inicio from './collections/Inicio';
import Estadisticas from './collections/Estadisticas';
import DocumentosAccesoRapido from './collections/DocumentosAccesoRapido';
import Eventos from './collections/Eventos';
import Multimedia from './collections/Multimedia';
import NuestrosCanales from './collections/NuestrosCanales';
import OfertaAcademica from './collections/OfertaAcademica';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Noticias, 
    Media,Inicio,
    Estadisticas,
    DocumentosAccesoRapido,
    Eventos,
    Multimedia,
    NuestrosCanales,
    OfertaAcademica],
  cors: '*',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
