import stringSimilarity from 'string-similarity';
import { generateEmbedding, cosineSimilarity } from './openai';
import { extractTextFromRichText } from '../utils/extractTextFromRichText';

export type KnowledgeItem = {
  text: string;
  source: string;
  id: string;
  embedding?: number[];
};

let knowledgeBase: KnowledgeItem[] = [];

const collectionsToIndex = [
  { slug: 'areas-de-conocimiento', fields: ['nombre', 'descripcion', 'carrerasRelacionadas'] },
  { slug: 'carrera', fields: ['nombre', 'descripcion'] },
  { slug: 'noticias', fields: ['nombre', 'descripcionCorta', 'fecha'] },
  { slug: 'contactanos', fields: ['ubicacion', 'apartadoPostal', 'telefonos'] },
  { slug: 'canales', fields: ['nombre'] },
  { slug: 'recintos', fields: ['nombre', 'descripcion', 'telefonos'] },
  { slug: 'subCanales', fields: ['nombre', 'canalPrincipal'] },
  { slug: 'investigaciones', fields: ['nombre', 'descripcion'] },
  { slug: 'investigacion-area', fields: ['titulo', 'descripcion'] },
  { slug: 'eventos', fields: ['nombre', 'descripcion'] },
  { slug: 'posgrado', fields: ['nombre', 'descripcion'] },
];

// Extrae texto plano para indexing
function extractText(value: any): string {
  if (typeof value === 'string') return value;
  
  // Manejar arrays (puede ser RichText o array de strings)
  if (Array.isArray(value)) {
    // Si es RichText (tiene estructura de Slate)
    if (value.length > 0 && value[0]?.children) {
      return extractTextFromRichText(value);
    }
    // Si es array de strings u otros valores
    return value.map(v => typeof v === 'string' ? v : '').join(' ');
  }
  
  // Para objetos, intentar extraer como RichText primero
  if (typeof value === 'object' && value !== null) {
    // Si parece un nodo de RichText
    if ('children' in value || 'text' in value) {
      return extractTextFromRichText([value]);
    }
    return JSON.stringify(value);
  }
  
  return '';
}

export const trainBot = async (payload: any) => {
  const useEmbeddings = process.env.CHATBOT_USE_EMBEDDINGS === 'true';
  const provider = process.env.EMBEDDINGS_PROVIDER || 'openai';
  knowledgeBase = [];

  console.log(`🚀 Iniciando entrenamiento del chatbot`);
  console.log(`   Embeddings: ${useEmbeddings ? 'Activados' : 'Desactivados'}`);
  if (useEmbeddings) {
    console.log(`   Proveedor: ${provider.toUpperCase()}`);
  }

  for (const collection of collectionsToIndex) {
    try {
      const result = await payload.find({ collection: collection.slug, limit: 1000 });
      console.log(`[Entrenando] colección: ${collection.slug}, docs: ${result.totalDocs}`);

      for (const doc of result.docs) {
        const parts = collection.fields.map(f => {
          const val = doc[f];
          return val ? extractText(val) : '';
        }).filter(Boolean);

        const combined = parts.join('. ').toLowerCase();

        if (combined) {
          const item: KnowledgeItem = {
            text: combined,
            source: collection.slug,
            id: doc.id,
          };

          // Generar embedding si está habilitado
          if (useEmbeddings) {
            const embedding = await generateEmbedding(combined);
            if (embedding) {
              item.embedding = embedding;
            }
          }

          knowledgeBase.push(item);
        }
      }
    } catch (error) {
      console.error(`❌ Error entrenando colección ${collection.slug}:`, error);
    }
  }

  const withEmbeddings = knowledgeBase.filter(item => item.embedding).length;
  console.log(`[✅ Chatbot] Base cargada con ${knowledgeBase.length} entradas (${withEmbeddings} con embeddings)`);
};

export const getBestResponses = async (
  message: string,
  minRating?: number,
  maxResults?: number
): Promise<KnowledgeItem[]> => {
  if (!knowledgeBase.length) return [];

  const useEmbeddings = process.env.CHATBOT_USE_EMBEDDINGS === 'true';
  const minSimilarity = minRating ?? parseFloat(process.env.CHATBOT_MIN_SIMILARITY || '0.2');
  const limit = maxResults ?? parseInt(process.env.CHATBOT_MAX_RESULTS || '3');

  const lowerMsg = message.toLowerCase();

  // Búsqueda con embeddings si está habilitado
  if (useEmbeddings) {
    const queryEmbedding = await generateEmbedding(lowerMsg);
    
    if (queryEmbedding && knowledgeBase.some(item => item.embedding)) {
      const resultsWithSimilarity = knowledgeBase
        .filter(item => item.embedding)
        .map(item => ({
          item,
          similarity: cosineSimilarity(queryEmbedding, item.embedding!),
        }))
        .filter(({ similarity }) => similarity >= minSimilarity)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        .map(({ item }) => item);

      if (resultsWithSimilarity.length > 0) {
        return resultsWithSimilarity;
      }
    }
  }

  // Fallback a búsqueda por similitud de strings
  const matches = stringSimilarity.findBestMatch(
    lowerMsg,
    knowledgeBase.map(item => item.text)
  );

  const resultsWithRating = matches.ratings
    .map((r, i) => ({ rating: r.rating, item: knowledgeBase[i] }))
    .filter(({ rating }) => rating >= minSimilarity)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(({ item }) => item);

  if (resultsWithRating.length === 0) {
    // búsqueda parcial si no hay buen match
    const partialMatches = knowledgeBase.filter(item => item.text.includes(lowerMsg));
    return partialMatches.slice(0, limit);
  }

  return resultsWithRating;
};
