# Chatbot Inteligente - UniWeb

## 🤖 Descripción

Chatbot con IA que responde preguntas sobre la Universidad Nacional de Ingeniería usando información real de las colecciones del CMS.

## ✨ Características

### 🎯 Funcionalidades
- ✅ Respuestas basadas en datos reales del CMS
- ✅ Búsqueda inteligente en 8 colecciones principales
- ✅ Respuestas naturales y amigables
- ✅ Sistema de caché para reducir costos
- ✅ Soporte para múltiples proveedores de IA

### 💰 Optimizado para Bajo Costo
- ✅ **Caché de respuestas** (1 hora) - evita llamadas repetidas a la IA
- ✅ **Límite de tokens** (800 por respuesta) - suficiente para listar todas las carreras
- ✅ **Búsqueda inteligente** - detecta automáticamente si debe listar todo
- ✅ **Búsqueda en memoria** - sin consultas innecesarias a la BD
- ✅ **Gemini gratis** - hasta 15 requests/minuto sin costo

### 🔄 Proveedores Soportados

#### 1. Google Gemini (Recomendado - GRATIS)
- **Modelo**: `gemini-2.5-flash`
- **Costo**: GRATIS hasta 15 req/min, 1500 req/día
- **Velocidad**: Muy rápida
- **Calidad**: Excelente (última versión)
- **Límites**: 15 requests/minuto, 1500 requests/día en plan gratuito

#### 2. OpenAI GPT-3.5-turbo
- **Modelo**: `gpt-3.5-turbo`
- **Costo**: ~$0.0015 por 1K tokens
- **Velocidad**: Rápida
- **Calidad**: Excelente
- **Límites**: Según tu plan de OpenAI

## 🚀 Configuración

### 1. Obtener API Keys

#### Gemini (Recomendado - Gratis)
1. Ve a https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la clave generada

#### OpenAI (Opcional - De pago)
1. Ve a https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Haz clic en "Create new secret key"
4. Copia la clave generada

### 2. Configurar Variables de Entorno

Edita tu archivo `.env`:

```env
# Usar Gemini (GRATIS)
AI_PROVIDER=gemini
GEMINI_API_KEY=tu_clave_de_gemini_aqui

# O usar OpenAI (de pago)
# AI_PROVIDER=openai
# OPENAI_API_KEY=tu_clave_de_openai_aqui
```

### 3. Iniciar el Servidor

```bash
yarn dev
```

El chatbot se indexará automáticamente al iniciar.

## 📡 Uso de la API

### Endpoint Principal

```
POST /api/chatbot
```

### Ejemplo de Request

```bash
curl -X POST http://localhost:3000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "pregunta": "¿Qué carreras de ingeniería ofrece la UNI?"
  }'
```

### Ejemplo de Response

```json
{
  "response": "La UNI ofrece varias carreras de ingeniería como Ingeniería en Sistemas, Ingeniería Civil e Ingeniería Eléctrica. Cada una tiene un perfil académico específico que puedes consultar en nuestro sitio web.",
  "provider": "gemini",
  "tokensUsed": 145,
  "sources": [
    {
      "collection": "carrera",
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Ingeniería en Sistemas"
    }
  ],
  "fromCache": false
}
```

### Estadísticas del Chatbot

```bash
curl http://localhost:3000/api/chatbot/stats
```

Response:
```json
{
  "knowledge": {
    "items": 250,
    "lastIndexed": "2025-01-15T10:30:00.000Z",
    "cacheAge": 1234567
  },
  "responseCache": {
    "size": 45,
    "maxSize": 100
  },
  "config": {
    "provider": "gemini",
    "cacheDuration": "60 minutos"
  }
}
```

## 💡 Ejemplos de Preguntas

### Carreras
- "¿Qué carreras ofrece la UNI?"
- "¿Hay ingeniería en sistemas?"
- "Cuéntame sobre las carreras disponibles"

### Eventos
- "¿Qué eventos hay próximamente?"
- "¿Cuándo es la feria tecnológica?"
- "Eventos de este mes"

### Contacto
- "¿Cómo contacto a la universidad?"
- "¿Dónde está ubicada la UNI?"
- "Teléfonos de contacto"

### Recintos
- "¿Cuántos campus tiene la UNI?"
- "¿Dónde están los recintos?"
- "Campus en Managua"

## 🎛️ Configuración Avanzada

### Cambiar Proveedor de IA

En `.env`:
```env
# Usar Gemini (gratis)
AI_PROVIDER=gemini

# O usar OpenAI (de pago)
AI_PROVIDER=openai
```

### Ajustar Duración del Caché

En `src/chatbot/endpoint.ts`:
```typescript
const RESPONSE_CACHE_DURATION = 1000 * 60 * 60; // 1 hora (ajustar aquí)
```

### Ajustar Límite de Tokens

En `src/chatbot/ai-providers.ts`:
```typescript
max_tokens: 300, // Ajustar aquí (menor = más barato)
```

### Agregar Más Colecciones

En `src/chatbot/knowledge-base.ts`:
```typescript
const COLLECTIONS_TO_INDEX = [
  { slug: 'noticias', fields: ['nombre', 'descripcionCorta'], titleField: 'nombre' },
  // Agregar más aquí...
];
```

## 📊 Estimación de Costos

### Con Gemini (Recomendado)
- **Costo**: $0 (GRATIS)
- **Límite**: 15 requests/minuto, 1500 requests/día
- **Ideal para**: Desarrollo y producción con tráfico moderado

### Con OpenAI GPT-3.5-turbo
Asumiendo:
- 100 requests/día
- ~200 tokens promedio por request (entrada + salida)
- Precio: $0.0015 por 1K tokens

**Costo mensual**: ~$9 USD

Con caché activo (70% de hits):
**Costo mensual**: ~$2.70 USD

## 🔧 Troubleshooting

### Error: "API key no configurada"
- Verifica que `GEMINI_API_KEY` o `OPENAI_API_KEY` esté en tu `.env`
- Reinicia el servidor después de agregar la clave

### Respuestas genéricas
- El chatbot no encontró información relevante
- Agrega más contenido a tus colecciones
- Verifica que las colecciones estén indexadas (`/api/chatbot/stats`)

### Límite de requests excedido (Gemini)
- Gemini tiene límite de 15 req/min y 1500 req/día en plan gratuito
- El sistema automáticamente hace fallback a OpenAI si está configurado
- Considera implementar rate limiting en tu frontend

## 🚀 Mejoras Futuras

- [ ] Historial de conversación
- [ ] Respuestas con imágenes
- [ ] Sugerencias de preguntas
- [ ] Analytics de uso
- [ ] Rate limiting por IP
- [ ] Modo streaming para respuestas largas

## 📖 Documentación Adicional

- **Swagger UI**: http://localhost:3000/api-docs (ver sección Chatbot)
- **Gemini Docs**: https://ai.google.dev/docs
- **OpenAI Docs**: https://platform.openai.com/docs
