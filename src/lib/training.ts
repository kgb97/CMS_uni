import stringSimilarity from 'string-similarity';

export type KnowledgeItem = {
  text: string;
  source: string;
  id: string;
};

let knowledgeBase: KnowledgeItem[] = [];

const collectionsToIndex = [
  { slug: 'areas-de-conocimiento', fields: ['nombre', 'descripcion','carrerasRelacionadas'] },
  { slug: 'carrera', fields: ['nombre','descripcion'] },
  { slug: 'noticias', fields: ['nombre','descripcionCorta','fecha'] },
  { slug: 'contactanos', fields: ['ubicacion','apartadoPostal','telefonos'] },
  { slug: 'canales', fields: ['nombre'] },
  { slug: 'recintos', fields: ['nombre','descripcion','telefonos'] },
  { slug: 'subCanales', fields: ['nombre','canalPrincipal'] }
];

// Extrae texto plano para indexing
function extractText(value: any): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value.map(v => typeof v === 'string' ? v : '').join(' ');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return '';
}

export const trainBot = async (payload: any) => {
  knowledgeBase = [];

  for (const collection of collectionsToIndex) {
    const result = await payload.find({ collection: collection.slug, limit: 1000 });
    console.log(`[Entrenando] colección: ${collection.slug}, docs: ${result.totalDocs}`);

    for (const doc of result.docs) {
      const parts = collection.fields.map(f => {
        const val = doc[f];
        return val ? extractText(val) : '';
      }).filter(Boolean);

      const combined = parts.join('. ').toLowerCase();

      if (combined) {
        knowledgeBase.push({
          text: combined,
          source: collection.slug,
          id: doc.id,
        });
      }
    }
  }

  console.log(`[✅ Chatbot] Base cargada con ${knowledgeBase.length} entradas`);
};

export const getBestResponses = (message: string, minRating = 0.2, maxResults = 3): KnowledgeItem[] => {
  if (!knowledgeBase.length) return [];

  const lowerMsg = message.toLowerCase();

  const matches = stringSimilarity.findBestMatch(
    lowerMsg,
    knowledgeBase.map(item => item.text)
  );

  const resultsWithRating = matches.ratings
    .map((r, i) => ({ rating: r.rating, item: knowledgeBase[i] }))
    .filter(({ rating }) => rating >= minRating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxResults)
    .map(({ item }) => item);

  if (resultsWithRating.length === 0) {
    // búsqueda parcial si no hay buen match
    const partialMatches = knowledgeBase.filter(item => item.text.includes(lowerMsg));
    return partialMatches.slice(0, maxResults);
  }

  return resultsWithRating;
};
