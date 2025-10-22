import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

let openaiClient: OpenAI | null = null;
let geminiClient: GoogleGenerativeAI | null = null;

export const getOpenAIClient = (): OpenAI | null => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
};

export const getGeminiClient = (): GoogleGenerativeAI | null => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  return geminiClient;
};

export const generateEmbedding = async (text: string): Promise<number[] | null> => {
  const provider = process.env.EMBEDDINGS_PROVIDER || 'openai';

  try {
    if (provider === 'gemini') {
      return await generateGeminiEmbedding(text);
    } else {
      return await generateOpenAIEmbedding(text);
    }
  } catch (error) {
    console.error(`Error generando embedding con ${provider}:`, error);
    return null;
  }
};

const generateOpenAIEmbedding = async (text: string): Promise<number[] | null> => {
  const client = getOpenAIClient();
  if (!client) {
    console.warn('⚠️  OPENAI_API_KEY no configurada.');
    return null;
  }

  try {
    const response = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generando embedding con OpenAI:', error);
    return null;
  }
};

const generateGeminiEmbedding = async (text: string): Promise<number[] | null> => {
  const client = getGeminiClient();
  if (!client) {
    console.warn('⚠️  GEMINI_API_KEY no configurada.');
    return null;
  }

  try {
    const model = client.getGenerativeModel({ model: 'embedding-001' });
    const result = await model.embedContent(text);
    
    return result.embedding.values;
  } catch (error) {
    console.error('Error generando embedding con Gemini:', error);
    return null;
  }
};

// Calcula similitud coseno entre dos vectores
export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  if (vecA.length !== vecB.length) {
    throw new Error('Los vectores deben tener la misma longitud');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
};
