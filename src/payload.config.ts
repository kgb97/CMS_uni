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
import AreasDeConocimiento from './collections/areasDeConocimiento'
import Carreras from './collections/carreras'
import Contactanos from './collections/contactanos'
import Extension from './collections/Extension'
import Footer from './collections/footer'
import InvestigacionArea from './collections/InvestigacionArea'
import Investigaciones from './collections/investigaciones'
import Posgrado from './collections/posgrado'
import Recintos from './collections/recintos'
import Historial from './collections/historial'
import ChatbotEndpoint from './endpoints/chatbot'
import { trainBot } from './lib/training'

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
    AreasDeConocimiento,
    Carreras,
    Contactanos,
    Extension,
    Footer,
    InvestigacionArea,
    Investigaciones,
    Posgrado,
    Recintos,
    Noticias,
    Historial,
    ],
  endpoints: [ChatbotEndpoint],
  onInit: async (payload) => {
    try {
      console.log('🚀 Entrenando chatbot...')
      await trainBot(payload)
      console.log('✅ Entrenamiento completado')
    } catch (err) {
      console.error('❌ Error al entrenar chatbot:', err)
    }
  },
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
