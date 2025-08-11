import Noticias from '../collections/Noticias'
import Media from '../collections/Media' 
import Inicio from '../collections/Inicio';
import Estadisticas from '../collections/Estadisticas';
import DocumentosAccesoRapido from '../collections/DocumentosAccesoRapido';
import Eventos from '../collections/Eventos';
import Multimedia from '../collections/Multimedia';
import AreasDeConocimiento from '../collections/areasDeConocimiento'
import Carreras from '../collections/carreras'
import Contactanos from '../collections/contactanos'
import Extension from '../collections/Extension'
import Footer from '../collections/footer'
import InvestigacionArea from '../collections/InvestigacionArea'
import Investigaciones from '../collections/investigaciones'
import Posgrado from '../collections/posgrado'
import Recintos from '../collections/recintos'
import Canales from './canales';
import SubCanales from './subCanales';
import RedesSociales from './RedesSociales';
import Cargos from './Organizacion/cargos';
import OrganizacionUNI from './Organizacion/organizacionUNI';
import Divisiones from './Organizacion/divisiones';

const collectionsMap = {
  'areas-de-conocimiento': AreasDeConocimiento,
  'carreras': Carreras,
  'contactanos':Contactanos,
  'eventos' : Eventos,
  'extension':Extension,
  'inicio' : Inicio,
  'investigacion-area':InvestigacionArea,
  'investigaciones':Investigaciones,
  'noticias':Noticias,
  'posgrado': Posgrado,
  'recintos':Recintos,
  'canales' : Canales,
  'subCanales' : SubCanales,
  'cargos' : Cargos,
  'organizacionUNI' : OrganizacionUNI,
  'divisiones' : Divisiones
  // ...
};

export default collectionsMap;