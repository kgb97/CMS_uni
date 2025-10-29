import { Payload } from 'payload';

export interface KnowledgeItem {
  id: string;
  collection: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

// Caché en memoria para evitar consultas repetidas
let knowledgeCache: KnowledgeItem[] = [];
let lastIndexTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

// Colecciones a indexar (solo las más relevantes para el chatbot)
const COLLECTIONS_TO_INDEX = [
  { slug: 'noticias', fields: ['nombre', 'descripcionCorta'], titleField: 'nombre' },
  { slug: 'eventos', fields: ['nombre', 'descripcion', 'ubicacion'], titleField: 'nombre' },
  { slug: 'areas-de-conocimiento', fields: ['nombre'], titleField: 'nombre' },
  { slug: 'carrera', fields: ['nombre'], titleField: 'nombre' },
  { slug: 'recintos', fields: ['nombre', 'descripcion'], titleField: 'nombre' },
  { slug: 'contactanos', fields: ['ubicacion', 'localidad'], titleField: 'ubicacion' },
  { slug: 'posgrado', fields: ['nombre'], titleField: 'nombre' },
  { slug: 'investigaciones', fields: ['nombre'], titleField: 'nombre' },
];

/**
 * Extrae texto simple de cualquier valor
 */
function extractText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (Array.isArray(value)) {
    return value.map(v => extractText(v)).filter(Boolean).join(' ');
  }
  if (typeof value === 'object') {
    // Para RichText de Slate
    if (value.children) {
      return extractText(value.children);
    }
    if (value.text) {
      return value.text;
    }
    return Object.values(value).map(v => extractText(v)).filter(Boolean).join(' ');
  }
  return '';
}

/**
 * Indexa las colecciones en memoria (solo campos esenciales)
 */
export async function indexKnowledge(payload: Payload, force: boolean = false): Promise<void> {
  const now = Date.now();
  
  // Usar caché si está vigente
  if (!force && knowledgeCache.length > 0 && (now - lastIndexTime) < CACHE_DURATION) {
    console.log('[Chatbot] Usando caché de conocimiento');
    return;
  }

  console.log('[Chatbot] Indexando conocimiento...');
  const newCache: KnowledgeItem[] = [];

  for (const config of COLLECTIONS_TO_INDEX) {
    try {
      const result = await payload.find({
        collection: config.slug,
        limit: 50, // Limitar para reducir memoria
        depth: 0, // Sin relaciones para ahorrar
      });

      for (const doc of result.docs) {
        const contentParts = config.fields.map(field => extractText(doc[field])).filter(Boolean);
        const content = contentParts.join(' ').substring(0, 500); // Max 500 chars por doc

        if (content.trim()) {
          newCache.push({
            id: doc.id,
            collection: config.slug,
            title: doc[config.titleField] || 'Sin título',
            content: content.trim(),
            metadata: {
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
            },
          });
        }
      }

      console.log(`[Chatbot] Indexados ${result.docs.length} docs de ${config.slug}`);
    } catch (error) {
      console.error(`[Chatbot] Error indexando ${config.slug}:`, error);
    }
  }

  knowledgeCache = newCache;
  lastIndexTime = now;
  console.log(`[Chatbot] Indexación completa: ${knowledgeCache.length} items`);
}

/**
 * Busca en la base de conocimiento (búsqueda simple por palabras clave)
 */
export function searchKnowledge(query: string, limit: number = 5): KnowledgeItem[] {
  if (knowledgeCache.length === 0) {
    return [];
  }

  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(' ').filter(w => w.length > 3);

  // Detectar si busca por colección específica
  const collectionKeywords: Record<string, string[]> = {
    'carrera': ['carrera', 'carreras', 'ingeniería', 'ingenieria', 'programa', 'estudiar'],
    'eventos': ['evento', 'eventos', 'actividad', 'actividades'],
    'noticias': ['noticia', 'noticias', 'novedad', 'novedades'],
    'recintos': ['recinto', 'recintos', 'campus', 'sede', 'sedes', 'ubicación', 'ubicacion'],
    'areas-de-conocimiento': ['facultad', 'facultades', 'área', 'area', 'departamento'],
    'contactanos': ['contacto', 'teléfono', 'telefono', 'dirección', 'direccion', 'email'],
  };

  let targetCollection: string | null = null;
  for (const [collection, keywords] of Object.entries(collectionKeywords)) {
    if (keywords.some(kw => queryLower.includes(kw))) {
      targetCollection = collection;
      break;
    }
  }

  // Si busca una colección específica, devolver TODOS los items de esa colección
  if (targetCollection) {
    const collectionItems = knowledgeCache.filter(item => item.collection === targetCollection);
    if (collectionItems.length > 0) {
      console.log(`[Chatbot] Encontrados ${collectionItems.length} items de ${targetCollection}`);
      return collectionItems.slice(0, limit);
    }
  }

  // Búsqueda general por relevancia
  const scored = knowledgeCache.map(item => {
    const titleLower = item.title.toLowerCase();
    const contentLower = item.content.toLowerCase();
    
    let score = 0;
    
    // Coincidencia exacta en título vale más
    if (titleLower.includes(queryLower)) score += 10;
    
    // Coincidencia de palabras clave
    keywords.forEach(keyword => {
      if (titleLower.includes(keyword)) score += 3;
      if (contentLower.includes(keyword)) score += 1;
    });

    return { item, score };
  });

  // Filtrar y ordenar por relevancia
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.item);
}

/**
 * Obtiene el tamaño del caché
 */
export function getCacheStats() {
  return {
    items: knowledgeCache.length,
    lastIndexed: new Date(lastIndexTime).toISOString(),
    cacheAge: Date.now() - lastIndexTime,
  };
}
