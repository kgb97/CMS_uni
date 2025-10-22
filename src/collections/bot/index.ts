import Noticias from '../Noticias'
import Media from '../Media' 
import Inicio from '../Inicio';
import Estadisticas from '../Estadisticas';
import Eventos from '../Eventos';
import Multimedia from '../Multimedia';
import AreasDeConocimiento from '../Areas de Conocimiento/areasDeConocimiento'
import Carreras from '../Areas de Conocimiento/carreras'
import Contactanos from '../contactanos'
import Extension from '../Extension'
import Footer from '../footer'
import InvestigacionArea from '../Investigaciones/InvestigacionArea'
import Investigaciones from '../Investigaciones/investigaciones'
import Posgrado from '../posgrado'
import Recintos from '../recintos'
import Canales from '../Canales/canales';
import SubCanales from '../Canales/subCanales';
import RedesSociales from '../RedesSociales';
import Cargos from '../Organizacion/cargos';
import OrganizacionUNI from '../Organizacion/organizacionUNI';
import Divisiones from '../Organizacion/divisiones';
import CalendarioAcademico from '../Acceso Rapido/CalendarioAcademico';

const collectionsMap: Record<string, any> = {
  'areas-de-conocimiento': AreasDeConocimiento,
  'carrera': Carreras,  // Corregido: era 'carreras', debe ser 'carrera' (slug real)
  'contactanos': Contactanos,
  'eventos': Eventos,
  'extension': Extension,
  'inicio': Inicio,
  'investigacion-area': InvestigacionArea,
  'investigaciones': Investigaciones,
  'noticias': Noticias,
  'posgrado': Posgrado,
  'recintos': Recintos,
  'canales': Canales,
  'subCanales': SubCanales,
  'cargos': Cargos,
  'organizacionUNI': OrganizacionUNI,
  'divisiones': Divisiones,
  'redes-sociales': RedesSociales,
  'calendario-academico': CalendarioAcademico,
  'footer': Footer,
};

export default collectionsMap;