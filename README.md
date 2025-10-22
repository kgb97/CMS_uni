# UniWeb - CMS de la Universidad Nacional de Ingeniería

Sistema de gestión de contenidos (CMS) basado en [Payload](https://github.com/payloadcms/payload) para la Universidad Nacional de Ingeniería (UNI), con un **chatbot inteligente** integrado que utiliza embeddings de OpenAI para responder preguntas sobre la universidad.

## 🚀 Características

- **CMS Completo**: 21 colecciones para gestionar todo el contenido de la UNI
- **Chatbot Inteligente**: Sistema de búsqueda semántica con embeddings de OpenAI
- **API RESTful**: Endpoints documentados con Swagger
- **Validaciones**: Esquemas Zod para validación de datos
- **Rich Text Editor**: Editor Slate integrado
- **MongoDB**: Base de datos NoSQL escalable

## 📋 Colecciones del CMS

### Contenido Académico
- **Áreas de Conocimiento**: Áreas académicas de la universidad
- **Carreras**: Programas de pregrado
- **Posgrado**: Programas de maestría y doctorado

### Comunicación
- **Noticias**: Noticias y comunicados de prensa
- **Eventos**: Eventos académicos y culturales
- **Comunicados**: Avisos oficiales
- **Calendario Académico**: Fechas importantes del año académico

### Investigación
- **Investigaciones**: Proyectos de investigación
- **Investigación Área**: Áreas de investigación

### Organización
- **Cargos**: Puestos administrativos
- **Divisiones**: Divisiones organizacionales
- **Organización UNI**: Estructura organizacional

### Infraestructura
- **Recintos**: Campus y sedes
- **Canales**: Canales de comunicación
- **SubCanales**: Subcanales específicos

### Otros
- **Contactanos**: Información de contacto
- **Redes Sociales**: Enlaces a redes sociales
- **Multimedia**: Recursos multimedia
- **Footer**: Contenido del pie de página

## 🤖 Chatbot Inteligente

El chatbot utiliza **embeddings de IA** para búsqueda semántica avanzada, con soporte para **OpenAI** y **Google Gemini**, con fallback a búsqueda por similitud de strings.

### Configuración del Chatbot

En tu archivo `.env`, configura las siguientes variables:

```bash
# Configuración del Chatbot
CHATBOT_USE_EMBEDDINGS=true        # Activar/desactivar embeddings
CHATBOT_MIN_SIMILARITY=0.75        # Umbral mínimo de similitud (0-1)
CHATBOT_MAX_RESULTS=3              # Número máximo de resultados

# Proveedor de Embeddings: 'openai' o 'gemini'
EMBEDDINGS_PROVIDER=gemini         # Elige tu proveedor

# API Keys (solo necesitas una según el proveedor)
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

### Proveedores de Embeddings Soportados

#### **Google Gemini** (Recomendado - Gratuito) 🆓
- **Modelo**: `embedding-001`
- **Ventajas**: Gratuito, rápido, buena calidad
- **Cómo obtener API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)

```bash
EMBEDDINGS_PROVIDER=gemini
GEMINI_API_KEY=tu-api-key-de-gemini
```

#### **OpenAI** (Pago) 💳
- **Modelo**: `text-embedding-3-small`
- **Ventajas**: Alta precisión, bien documentado
- **Costo**: ~$0.02 por 1M tokens
- **Cómo obtener API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

```bash
EMBEDDINGS_PROVIDER=openai
OPENAI_API_KEY=sk-tu-api-key-de-openai
```

### Endpoint del Chatbot

**POST** `/api/chatbot`

```json
{
  "pregunta": "¿Qué carreras ofrece el área de ingeniería?"
}
```

**Respuesta:**
```json
{
  "response": "### 🔎 Ingeniería de Sistemas\n\nLa carrera forma profesionales...",
  "collection": "carrera",
  "documentId": "507f1f77bcf86cd799439011",
  "allResults": [...]
}
```

### Colecciones Indexadas

El chatbot indexa automáticamente las siguientes colecciones:
- Áreas de Conocimiento y Carreras
- Noticias y Eventos
- Investigaciones
- Recintos y Contacto
- Canales y Posgrado

## 🛠️ Development

Para ejecutar el proyecto localmente:

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd uni-web
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y configura:
   - `DATABASE_URI`: URL de MongoDB
   - `PAYLOAD_SECRET`: Secret key para Payload
   - `OPENAI_API_KEY`: API key de OpenAI (opcional pero recomendado)

3. **Instalar dependencias**
   ```bash
   yarn install
   # o
   npm install
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   yarn dev
   # o
   npm run dev
   ```

5. **Acceder al panel de administración**
   - Abre [http://localhost:3000/admin](http://localhost:3000/admin)
   - Crea tu primer usuario administrador

6. **Acceder a la documentación Swagger**
   - Abre [http://localhost:3000/swagger](http://localhost:3000/swagger)

Los cambios en `./src` se reflejarán automáticamente en la aplicación.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this project locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## 📦 Production

Para ejecutar Payload en producción:

1. **Build del proyecto**
   ```bash
   yarn build
   # o
   npm run build
   ```
   Esto crea un directorio `./build` con el bundle de producción.

2. **Servir la aplicación**
   ```bash
   yarn serve
   # o
   npm run serve
   ```

### Deployment

Opciones de despliegue:
- **Payload Cloud**: [Despliegue con un click](https://payloadcms.com/new/import)
- **Manual**: Consulta la [documentación de deployment](https://payloadcms.com/docs/production/deployment)

## 🔧 Tecnologías

- **Backend**: Node.js + Express + TypeScript
- **CMS**: Payload CMS v2.0
- **Base de datos**: MongoDB (Mongoose)
- **Editor**: Slate Rich Text Editor
- **AI/ML**: OpenAI Embeddings API + Google Gemini API
- **Validación**: Zod
- **Documentación**: Swagger/OpenAPI 3.0

## 📚 Estructura del Proyecto

```
uni-web/
├── src/
│   ├── collections/          # Colecciones de Payload CMS
│   │   ├── Areas de Conocimiento/
│   │   ├── Investigaciones/
│   │   ├── Organizacion/
│   │   ├── Canales/
│   │   ├── Acceso Rapido/
│   │   └── bot/             # Configuración del chatbot
│   ├── endpoints/           # Endpoints personalizados
│   │   └── chatbot.ts       # Endpoint del chatbot
│   ├── lib/                 # Librerías y utilidades
│   │   ├── openai.ts        # Cliente de OpenAI
│   │   └── training.ts      # Sistema de entrenamiento
│   ├── validators/          # Esquemas de validación Zod
│   ├── swagger/             # Documentación Swagger
│   ├── utils/               # Utilidades generales
│   ├── payload.config.ts    # Configuración de Payload
│   └── server.ts            # Servidor Express
├── .env.example             # Variables de entorno de ejemplo
├── package.json
└── tsconfig.json
```

## 🆕 Mejoras Recientes

### ✅ Bugs Críticos Corregidos
- ✔️ Eliminado puerto duplicado en `server.ts`
- ✔️ Corregidos typos en nombres de carpetas (`Invstigaciones` → `Investigaciones`, `Conociminto` → `Conocimiento`)
- ✔️ Eliminado entrenamiento duplicado del chatbot

### ✅ Chatbot Mejorado
- ✔️ Implementado sistema de embeddings con OpenAI (text-embedding-3-small)
- ✔️ Búsqueda semántica avanzada con similitud coseno
- ✔️ Fallback automático a búsqueda por strings
- ✔️ Configuración flexible mediante variables de entorno
- ✔️ Indexación de 11 colecciones (antes 7)
- ✔️ Manejo robusto de errores

### ✅ API Documentada
- ✔️ Documentación completa con Swagger/OpenAPI 3.0
- ✔️ Validaciones con Zod para el endpoint del chatbot
- ✔️ Respuestas de error estructuradas
- ✔️ Ejemplos de uso en la documentación

## 🤝 Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 📞 Soporte

Si tienes preguntas o problemas:
- Consulta la [documentación de Payload](https://payloadcms.com/docs)
- Revisa la documentación Swagger en `/swagger`
- Contacta al equipo de desarrollo
