import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'openai' | 'gemini' | 'ollama';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  tokensUsed?: number;
  provider: AIProvider;
}

// Cliente OpenAI (GPT-3.5-turbo es el más económico)
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient && process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  if (!openaiClient) {
    throw new Error('OpenAI API key no configurada');
  }
  return openaiClient;
}

// Cliente Ollama — usa la API compatible con OpenAI
let ollamaClient: OpenAI | null = null;

function getOllamaClient(): OpenAI {
  if (!ollamaClient) {
    const baseURL = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434') + '/v1';
    ollamaClient = new OpenAI({
      apiKey: 'ollama', // requerido por el cliente pero no usado por Ollama
      baseURL,
    });
  }
  return ollamaClient;
}

/**
 * Genera embeddings usando Ollama (nomic-embed-text)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';

  const response = await fetch(`${baseURL}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt: text }),
  });

  if (!response.ok) {
    throw new Error(`Ollama embeddings error: ${response.statusText}`);
  }

  const data = await response.json() as { embedding: number[] };
  return data.embedding;
}

/**
 * Calcula similitud coseno entre dos vectores
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Cliente Gemini (Gemini Flash es gratuito hasta 15 req/min)
let geminiClient: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  if (!geminiClient) {
    throw new Error('Gemini API key no configurada');
  }
  return geminiClient;
}

/**
 * Genera respuesta usando OpenAI (GPT-3.5-turbo)
 * Modelo más económico: ~$0.0015 por 1K tokens
 */
async function generateWithOpenAI(messages: ChatMessage[]): Promise<AIResponse> {
  const client = getOpenAIClient();
  
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo', // Modelo más económico
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    temperature: 0.7,
    max_tokens: 800, // Suficiente para listar todas las carreras
  });

  return {
    content: response.choices[0]?.message?.content || 'Sin respuesta',
    tokensUsed: response.usage?.total_tokens,
    provider: 'openai',
  };
}

/**
 * Genera respuesta usando Google Gemini (gemini-2.5-flash)
 * GRATIS hasta 15 requests/minuto. Soporta historial multi-turno via startChat()
 */
async function generateWithGemini(messages: ChatMessage[]): Promise<AIResponse> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
      maxOutputTokens: 800,
      temperature: 0.7,
    },
  });

  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const conversationMessages = messages.filter(m => m.role !== 'system');
  const lastMessage = conversationMessages[conversationMessages.length - 1];
  const historyMessages = conversationMessages.slice(0, -1);

  // Convertir historial al formato de Gemini
  const geminiHistory = historyMessages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  // Si hay system message, inyectarlo como primer turno del historial
  const fullHistory = systemMessage
    ? [
        { role: 'user', parts: [{ text: `Instrucciones del sistema: ${systemMessage}` }] },
        { role: 'model', parts: [{ text: 'Entendido. Seguiré esas instrucciones.' }] },
        ...geminiHistory,
      ]
    : geminiHistory;

  const chat = model.startChat({ history: fullHistory });
  const result = await chat.sendMessage(lastMessage?.content || '');
  const response = result.response;

  return {
    content: response.text(),
    tokensUsed: response.usageMetadata?.totalTokenCount,
    provider: 'gemini',
  };
}

/**
 * Genera respuesta usando Ollama (modelo local en red)
 */
async function generateWithOllama(messages: ChatMessage[]): Promise<AIResponse> {
  const client = getOllamaClient();
  const model = process.env.OLLAMA_CHAT_MODEL || 'qwen2.5:1.5b';

  const response = await client.chat.completions.create({
    model,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    temperature: 0.7,
    max_tokens: 800,
  });

  return {
    content: response.choices[0]?.message?.content || 'Sin respuesta',
    tokensUsed: response.usage?.total_tokens,
    provider: 'ollama',
  };
}

/**
 * Genera respuesta usando el proveedor configurado
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  provider?: AIProvider
): Promise<AIResponse> {
  const selectedProvider = provider || (process.env.AI_PROVIDER as AIProvider) || 'gemini';

  try {
    if (selectedProvider === 'openai') {
      return await generateWithOpenAI(messages);
    } else if (selectedProvider === 'ollama') {
      return await generateWithOllama(messages);
    } else {
      return await generateWithGemini(messages);
    }
  } catch (error: any) {
    console.error(`Error con ${selectedProvider}:`, error.message);
    console.error('Detalles del error:', error);

    // Fallback a Ollama si está configurado
    if (selectedProvider !== 'ollama' && process.env.OLLAMA_BASE_URL) {
      console.log('Intentando con Ollama como fallback...');
      return await generateWithOllama(messages);
    } else if (selectedProvider === 'openai' && process.env.GEMINI_API_KEY) {
      console.log('Intentando con Gemini como fallback...');
      return await generateWithGemini(messages);
    } else if (selectedProvider === 'gemini' && process.env.OPENAI_API_KEY) {
      console.log('Intentando con OpenAI como fallback...');
      return await generateWithOpenAI(messages);
    } else {
      // No hay fallback disponible, lanzar error
      throw new Error(`Error con ${selectedProvider}: ${error.message}. No hay proveedor alternativo configurado.`);
    }
  }
}
