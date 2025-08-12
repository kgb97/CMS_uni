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
import Eventos from './collections/Eventos';
import Multimedia from './collections/Multimedia';
import AreasDeConocimiento from './collections/Areas de Conociminto/areasDeConocimiento'
import Carreras from './collections/Areas de Conociminto/carreras'
import Contactanos from './collections/contactanos'
import Extension from './collections/Extension'
import Footer from './collections/footer'
import InvestigacionArea from './collections/Invstigaciones/InvestigacionArea'
import Investigaciones from './collections/Invstigaciones/investigaciones'
import Posgrado from './collections/posgrado'
import Recintos from './collections/recintos'
import Historial from './collections/bot/historial'
import ChatbotEndpoint from './endpoints/chatbot'
import { trainBot } from './lib/training'
import Canales from './collections/Canales/canales'
import SubCanales from './collections/Canales/subCanales'
import RedesSociales from './collections/RedesSociales'
import Cargos from './collections/Organizacion/cargos'
import OrganizacionUNI from './collections/Organizacion/organizacionUNI'
import Divisiones from './collections/Organizacion/divisiones'
import CalendarioAcademico from './collections/Acceso Rapido/CalendarioAcademico'
import Comunicados from './collections/Acceso Rapido/comunicados'

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
    Eventos,
    Multimedia,
    Canales,
    SubCanales,
    AreasDeConocimiento,
    Carreras,
    Contactanos,
    Extension,
    Footer,
    InvestigacionArea,
    Investigaciones,
    Posgrado,
    Recintos,
    Historial,
    RedesSociales,
    Cargos,
    OrganizacionUNI,
    Divisiones,
    CalendarioAcademico,
    Comunicados,
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
