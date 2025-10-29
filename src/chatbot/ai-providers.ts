import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'openai' | 'gemini';

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
 * Genera respuesta usando Google Gemini (gemini-1.5-flash)
 * GRATIS hasta 15 requests/minuto
 */
async function generateWithGemini(messages: ChatMessage[]): Promise<AIResponse> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: 'gemini-2.5-flash', // Modelo gratuito más reciente
    generationConfig: {
      maxOutputTokens: 800, // Suficiente para listar todas las carreras
      temperature: 0.7,
    },
  });

  // Gemini usa un formato diferente - combinar mensajes
  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const userMessages = messages.filter(m => m.role === 'user');
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';

  const prompt = systemMessage 
    ? `${systemMessage}\n\nPregunta del usuario: ${lastUserMessage}`
    : lastUserMessage;

  const result = await model.generateContent(prompt);
  const response = result.response;

  return {
    content: response.text(),
    tokensUsed: response.usageMetadata?.totalTokenCount,
    provider: 'gemini',
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
    } else {
      return await generateWithGemini(messages);
    }
  } catch (error: any) {
    console.error(`Error con ${selectedProvider}:`, error.message);
    console.error('Detalles del error:', error);
    
    // Solo hacer fallback si el otro proveedor está configurado
    if (selectedProvider === 'openai' && process.env.GEMINI_API_KEY) {
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
