import { Endpoint } from 'payload/config';

/**
 * Categorías de preguntas frecuentes para el chatbot
 */
export interface SuggestedQuestion {
  id: string;
  question: string;
  category: string;
  icon?: string;
}

export interface QuestionCategory {
  name: string;
  icon: string;
  questions: SuggestedQuestion[];
}

/**
 * Preguntas frecuentes organizadas por categoría
 */
export const SUGGESTED_QUESTIONS: QuestionCategory[] = [
  {
    name: 'Carreras y Programas',
    icon: '🎓',
    questions: [
      {
        id: 'carreras-disponibles',
        question: '¿Qué carreras ofrece la UNI?',
        category: 'Carreras y Programas',
        icon: '📚',
      },
      {
        id: 'ingenieria-sistemas',
        question: '¿Qué aprendo en Ingeniería de Sistemas?',
        category: 'Carreras y Programas',
        icon: '💻',
      },
      {
        id: 'posgrados',
        question: '¿Qué maestrías y posgrados tienen?',
        category: 'Carreras y Programas',
        icon: '🎯',
      },
      {
        id: 'duracion-carreras',
        question: '¿Cuánto dura una carrera en la UNI?',
        category: 'Carreras y Programas',
        icon: '⏱️',
      },
    ],
  },
  {
    name: 'Admisión e Inscripción',
    icon: '📝',
    questions: [
      {
        id: 'requisitos-ingreso',
        question: '¿Cuáles son los requisitos para ingresar?',
        category: 'Admisión e Inscripción',
        icon: '📋',
      },
      {
        id: 'proceso-admision',
        question: '¿Cómo es el proceso de admisión?',
        category: 'Admisión e Inscripción',
        icon: '✅',
      },
      {
        id: 'fechas-inscripcion',
        question: '¿Cuándo son las inscripciones?',
        category: 'Admisión e Inscripción',
        icon: '📅',
      },
      {
        id: 'costos-matricula',
        question: '¿Cuánto cuesta estudiar en la UNI?',
        category: 'Admisión e Inscripción',
        icon: '💰',
      },
    ],
  },
  {
    name: 'Campus y Recintos',
    icon: '🏛️',
    questions: [
      {
        id: 'recintos-disponibles',
        question: '¿Qué recintos tiene la UNI?',
        category: 'Campus y Recintos',
        icon: '🏫',
      },
      {
        id: 'ubicacion-uni',
        question: '¿Dónde está ubicada la UNI?',
        category: 'Campus y Recintos',
        icon: '📍',
      },
      {
        id: 'horarios-atencion',
        question: '¿Cuál es el horario de atención?',
        category: 'Campus y Recintos',
        icon: '🕐',
      },
      {
        id: 'instalaciones',
        question: '¿Qué instalaciones tiene la universidad?',
        category: 'Campus y Recintos',
        icon: '🏗️',
      },
    ],
  },
  {
    name: 'Eventos y Noticias',
    icon: '📰',
    questions: [
      {
        id: 'proximos-eventos',
        question: '¿Qué eventos próximos hay?',
        category: 'Eventos y Noticias',
        icon: '🎉',
      },
      {
        id: 'ultimas-noticias',
        question: '¿Cuáles son las últimas noticias?',
        category: 'Eventos y Noticias',
        icon: '📢',
      },
      {
        id: 'actividades-culturales',
        question: '¿Hay actividades culturales o deportivas?',
        category: 'Eventos y Noticias',
        icon: '🎭',
      },
      {
        id: 'conferencias',
        question: '¿Organizan conferencias o talleres?',
        category: 'Eventos y Noticias',
        icon: '🎤',
      },
    ],
  },
  {
    name: 'Investigación',
    icon: '🔬',
    questions: [
      {
        id: 'proyectos-investigacion',
        question: '¿Qué proyectos de investigación tienen?',
        category: 'Investigación',
        icon: '🧪',
      },
      {
        id: 'areas-investigacion',
        question: '¿En qué áreas investigan?',
        category: 'Investigación',
        icon: '🔍',
      },
      {
        id: 'participar-investigacion',
        question: '¿Cómo puedo participar en investigación?',
        category: 'Investigación',
        icon: '👨‍🔬',
      },
      {
        id: 'publicaciones',
        question: '¿Tienen publicaciones científicas?',
        category: 'Investigación',
        icon: '📖',
      },
    ],
  },
  {
    name: 'Contacto y Ayuda',
    icon: '📞',
    questions: [
      {
        id: 'contacto-general',
        question: '¿Cómo puedo contactar a la UNI?',
        category: 'Contacto y Ayuda',
        icon: '📧',
      },
      {
        id: 'redes-sociales',
        question: '¿Cuáles son sus redes sociales?',
        category: 'Contacto y Ayuda',
        icon: '📱',
      },
      {
        id: 'atencion-estudiantes',
        question: '¿Dónde puedo obtener ayuda como estudiante?',
        category: 'Contacto y Ayuda',
        icon: '🆘',
      },
      {
        id: 'telefono-contacto',
        question: '¿Cuál es el número de teléfono?',
        category: 'Contacto y Ayuda',
        icon: '☎️',
      },
    ],
  },
];

/**
 * Endpoint para obtener preguntas sugeridas/frecuentes
 */
export const SuggestedQuestionsEndpoint: Endpoint = {
  path: '/chatbot/questions',
  method: 'get',
  handler: async (req, res) => {
    try {
      const { category } = req.query;

      // Si se solicita una categoría específica
      if (category && typeof category === 'string') {
        const categoryData = SUGGESTED_QUESTIONS.find(
          (cat) => cat.name.toLowerCase() === category.toLowerCase()
        );

        if (!categoryData) {
          return res.status(404).json({
            error: 'Categoría no encontrada',
            availableCategories: SUGGESTED_QUESTIONS.map((cat) => cat.name),
          });
        }

        return res.json({
          category: categoryData.name,
          icon: categoryData.icon,
          questions: categoryData.questions,
        });
      }

      // Retornar todas las categorías y preguntas
      return res.json({
        total: SUGGESTED_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0),
        categories: SUGGESTED_QUESTIONS,
      });
    } catch (error: any) {
      console.error('[Chatbot Questions] Error:', error);
      return res.status(500).json({
        error: 'Error obteniendo preguntas sugeridas',
        message: error.message,
      });
    }
  },
};

/**
 * Endpoint para obtener una pregunta aleatoria
 */
export const RandomQuestionEndpoint: Endpoint = {
  path: '/chatbot/questions/random',
  method: 'get',
  handler: async (req, res) => {
    try {
      const { category } = req.query;

      let availableQuestions: SuggestedQuestion[] = [];

      if (category && typeof category === 'string') {
        // Filtrar por categoría
        const categoryData = SUGGESTED_QUESTIONS.find(
          (cat) => cat.name.toLowerCase() === category.toLowerCase()
        );

        if (!categoryData) {
          return res.status(404).json({
            error: 'Categoría no encontrada',
            availableCategories: SUGGESTED_QUESTIONS.map((cat) => cat.name),
          });
        }

        availableQuestions = categoryData.questions;
      } else {
        // Todas las preguntas
        availableQuestions = SUGGESTED_QUESTIONS.flatMap((cat) => cat.questions);
      }

      // Seleccionar pregunta aleatoria
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];

      return res.json({
        question: randomQuestion,
      });
    } catch (error: any) {
      console.error('[Random Question] Error:', error);
      return res.status(500).json({
        error: 'Error obteniendo pregunta aleatoria',
        message: error.message,
      });
    }
  },
};

export default SuggestedQuestionsEndpoint;
