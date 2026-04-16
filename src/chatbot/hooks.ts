import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types';
import { invalidateKnowledgeCache } from './knowledge-base';

/**
 * Hook para invalidar caché del chatbot cuando cambia una colección indexada
 * Se ejecuta después de crear, actualizar o eliminar documentos
 */
export const invalidateChatbotCache: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  // Solo invalidar en operaciones de create y update
  if (operation === 'create' || operation === 'update') {
    console.log(`[Chatbot Hook] Detectado cambio en colección, invalidando cachés...`);
    invalidateKnowledgeCache();
  }
  return doc;
};

/**
 * Hook para invalidar caché cuando se elimina un documento
 */
export const invalidateChatbotCacheOnDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  console.log(`[Chatbot Hook] Detectada eliminación en colección, invalidando cachés...`);
  invalidateKnowledgeCache();
  return doc;
};

/**
 * Configuración de hooks para una colección
 * Usar esto en cada colección indexada por el chatbot
 */
export const chatbotHooks = {
  afterChange: [invalidateChatbotCache],
  afterDelete: [invalidateChatbotCacheOnDelete],
};
