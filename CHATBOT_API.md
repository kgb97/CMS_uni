# 🤖 API del Chatbot - UniWeb

## Endpoints Disponibles

### 1. POST `/api/chatbot`
**Chatbot inteligente con IA**

Envía una pregunta y recibe una respuesta generada por IA basada en la información de la universidad.

**Request:**
```json
{
  "pregunta": "¿Qué carreras ofrece la UNI?"
}
```

**Response:**
```json
{
  "response": "La UNI ofrece varias carreras de ingeniería como...",
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

---

### 2. GET `/api/chatbot/questions`
**Preguntas frecuentes y sugeridas**

Obtiene una lista de preguntas frecuentes organizadas por categorías.

**Parámetros opcionales:**
- `category` (string): Filtrar por categoría específica

**Ejemplos:**

**Todas las preguntas:**
```bash
GET /api/chatbot/questions
```

**Response:**
```json
{
  "total": 24,
  "categories": [
    {
      "name": "Carreras y Programas",
      "icon": "🎓",
      "questions": [
        {
          "id": "carreras-disponibles",
          "question": "¿Qué carreras ofrece la UNI?",
          "category": "Carreras y Programas",
          "icon": "📚"
        },
        {
          "id": "ingenieria-sistemas",
          "question": "¿Qué aprendo en Ingeniería de Sistemas?",
          "category": "Carreras y Programas",
          "icon": "💻"
        }
      ]
    },
    {
      "name": "Eventos y Noticias",
      "icon": "📰",
      "questions": [...]
    }
  ]
}
```

**Filtrar por categoría:**
```bash
GET /api/chatbot/questions?category=Eventos y Noticias
```

**Response:**
```json
{
  "category": "Eventos y Noticias",
  "icon": "📰",
  "questions": [
    {
      "id": "proximos-eventos",
      "question": "¿Qué eventos próximos hay?",
      "category": "Eventos y Noticias",
      "icon": "🎉"
    }
  ]
}
```

---

### 3. GET `/api/chatbot/questions/random`
**Pregunta aleatoria**

Obtiene una pregunta aleatoria para mostrar como sugerencia.

**Parámetros opcionales:**
- `category` (string): Filtrar por categoría específica

**Ejemplos:**

**Pregunta aleatoria de cualquier categoría:**
```bash
GET /api/chatbot/questions/random
```

**Response:**
```json
{
  "question": {
    "id": "contacto-general",
    "question": "¿Cómo puedo contactar a la UNI?",
    "category": "Contacto y Ayuda",
    "icon": "📧"
  }
}
```

**Pregunta aleatoria de una categoría específica:**
```bash
GET /api/chatbot/questions/random?category=Investigación
```

**Response:**
```json
{
  "question": {
    "id": "proyectos-investigacion",
    "question": "¿Qué proyectos de investigación tienen?",
    "category": "Investigación",
    "icon": "🧪"
  }
}
```

---

### 4. GET `/api/chatbot/stats`
**Estadísticas del chatbot**

Obtiene información sobre el estado del chatbot y uso de caché.

**Response:**
```json
{
  "knowledge": {
    "items": 250,
    "lastIndexed": "2025-10-28T23:00:00.000Z",
    "cacheAge": 3600000
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

---

## 📋 Categorías de Preguntas

Las preguntas están organizadas en las siguientes categorías:

1. **🎓 Carreras y Programas**
   - Información sobre carreras de pregrado
   - Programas académicos
   - Duración y requisitos

2. **📝 Admisión e Inscripción**
   - Proceso de admisión
   - Requisitos de ingreso
   - Fechas y costos

3. **🏛️ Campus y Recintos**
   - Ubicaciones
   - Instalaciones
   - Horarios de atención

4. **📰 Eventos y Noticias**
   - Próximos eventos
   - Noticias recientes
   - Actividades culturales

5. **🔬 Investigación**
   - Proyectos de investigación
   - Áreas de investigación
   - Publicaciones

6. **📞 Contacto y Ayuda**
   - Información de contacto
   - Redes sociales
   - Soporte estudiantil

---

## 💡 Casos de Uso

### Integración en Frontend

**Mostrar preguntas sugeridas al cargar el chat:**
```javascript
// Obtener todas las categorías
const response = await fetch('/api/chatbot/questions');
const data = await response.json();

// Mostrar las primeras 3 preguntas de cada categoría
data.categories.forEach(category => {
  console.log(`${category.icon} ${category.name}`);
  category.questions.slice(0, 3).forEach(q => {
    console.log(`  ${q.icon} ${q.question}`);
  });
});
```

**Mostrar pregunta aleatoria como placeholder:**
```javascript
const response = await fetch('/api/chatbot/questions/random');
const data = await response.json();

// Usar como placeholder en el input
inputElement.placeholder = data.question.question;
```

**Enviar pregunta al chatbot:**
```javascript
const response = await fetch('/api/chatbot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pregunta: "¿Qué carreras ofrece la UNI?"
  })
});

const data = await response.json();
console.log(data.response);
```

---

## 🔧 Configuración

El chatbot utiliza las siguientes variables de entorno:

```bash
# Proveedor de IA (gemini o openai)
AI_PROVIDER=gemini

# API Keys
GEMINI_API_KEY=tu_gemini_api_key
# OPENAI_API_KEY=tu_openai_api_key
```

---

## 📚 Documentación Completa

Para ver la documentación completa con ejemplos interactivos, visita:

**Swagger UI:** `https://tu-dominio.com/api-docs`

Ahí encontrarás:
- Esquemas completos de request/response
- Ejemplos interactivos
- Posibilidad de probar los endpoints directamente
