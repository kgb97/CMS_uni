import stringSimilarity from 'string-similarity';

type KnowledgeItem = {
  text: string;
  source: string;
  id: string;
};

let knowledgeBase: KnowledgeItem[] = [];

const collectionsToIndex = [
  { slug: 'areas-de-conocimiento', fields: ['nombre', 'descripcion'] },
  {slug: 'carreras', fields: ['nombre','Descripción']},
  {slug: 'noticias', fields: ['nombre','descripcionCorta','fecha']},
  {slug: 'contactanos', fields: ['ubicacion','apartadoPostal','telefonos']},
  {slug:'nuestros-canales', fields:['nombre','descripcionCorta']}
];

export const trainBot = async (payload: any) => {
  knowledgeBase = [];

  for (const collection of collectionsToIndex) {
    const result = await payload.find({ collection: collection.slug, limit: 1000 });
    for (const doc of result.docs) {
      const parts = collection.fields.map((f) => doc[f] || '').filter(Boolean);
      const combined = parts.join('. ');
      if (combined) {
        knowledgeBase.push({
          text: combined.toLowerCase(),
          source: collection.slug,
          id: doc.id,
        });
      }
    }
  }

  console.log(`[✅ Chatbot] Base cargada con ${knowledgeBase.length} entradas`);
};

export const getBestResponse = (message: string): KnowledgeItem | null => {
  if (!knowledgeBase.length) return null;

  const { bestMatchIndex, bestMatch } = stringSimilarity.findBestMatch(
    message.toLowerCase(),
    knowledgeBase.map((item) => item.text)
  );

  return bestMatch.rating > 0.4 ? knowledgeBase[bestMatchIndex] : null;
};
