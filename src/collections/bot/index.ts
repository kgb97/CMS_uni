import Noticias from '../Noticias'
import Media from '../Media' 
import Inicio from '../Inicio';
import Estadisticas from '../Estadisticas';
import Eventos from '../Eventos';
import Multimedia from '../Multimedia';
import AreasDeConocimiento from '../Areas de Conociminto/areasDeConocimiento'
import Carreras from '../Areas de Conociminto/carreras'
import Contactanos from '../contactanos'
import Extension from '../Extension'
import Footer from '../footer'
import InvestigacionArea from '../Invstigaciones/InvestigacionArea'
import Investigaciones from '../Invstigaciones/investigaciones'
import Posgrado from '../posgrado'
import Recintos from '../recintos'
import Canales from '../Canales/canales';
import SubCanales from '../Canales/subCanales';
import RedesSociales from '../RedesSociales';
import Cargos from '../Organizacion/cargos';
import OrganizacionUNI from '../Organizacion/organizacionUNI';
import Divisiones from '../Organizacion/divisiones';
import CalendarioAcademico from '../Acceso Rapido/CalendarioAcademico';

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
  'divisiones' : Divisiones,
  'redes-sociales': RedesSociales,
  'calendario-academico': CalendarioAcademico,
  'footer': Footer,
  // ...
};

export default collectionsMap;