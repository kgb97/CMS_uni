# UniWeb - CMS para la Universidad Nacional de Ingeniería

Sistema de gestión de contenidos (CMS) basado en [Payload CMS](https://payloadcms.com) desarrollado específicamente para la Universidad Nacional de Ingeniería (UNI) de Nicaragua.

## 🎯 Características

- **CMS Headless** basado en Payload CMS 2.0
- **24 Colecciones** organizadas para gestionar todo el contenido universitario
- **Chatbot con IA** (OpenAI/Gemini) optimizado para bajo consumo
- **API REST y GraphQL** generadas automáticamente
- **Documentación Swagger** completa e interactiva
- **Panel de administración** intuitivo y personalizable
- **Gestión de medios** con soporte para imágenes y archivos
- **Relaciones entre contenidos** para estructurar información compleja
- **Sistema de caché** para optimizar rendimiento y costos

## 📚 Colecciones Disponibles

### Información General
- **Inicio**: Contenido de la página principal
- **Noticias**: Publicaciones y comunicados
- **Eventos**: Calendario de actividades
- **Multimedia**: Galería de contenido audiovisual
- **Estadísticas**: Datos y métricas institucionales

### Académico
- **Áreas de Conocimiento**: Facultades y departamentos
- **Carreras**: Programas académicos
- **Posgrado**: Programas de maestría y doctorado
- **Investigaciones**: Proyectos de investigación
- **Investigación por Área**: Categorización de investigaciones

### Organización
- **Organización UNI**: Estructura institucional
- **Cargos**: Puestos y responsabilidades
- **Divisiones**: Unidades administrativas

### Comunicación
- **Canales**: Medios de comunicación principales
- **SubCanales**: Canales secundarios
- **Redes Sociales**: Enlaces a perfiles sociales
- **Extensión**: Programas de extensión universitaria

### Información de Contacto
- **Contactános**: Información de contacto general
- **Recintos**: Campus y sedes universitarias
- **Calendario Académico**: Fechas importantes
- **Comunicados**: Anuncios oficiales

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 14+ 
- MongoDB 4.4+
- Yarn o npm

### Configuración Inicial

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd uni-web
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   # o
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   DATABASE_URI=mongodb://127.0.0.1/uniweb
   PAYLOAD_SECRET=tu-secreto-seguro-aqui
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
   PORT=3000
   
   # Chatbot (Gemini es GRATIS)
   AI_PROVIDER=gemini
   GEMINI_API_KEY=tu_clave_de_gemini_aqui
   ```
   
   **Obtener API Key de Gemini (gratis)**: https://makersuite.google.com/app/apikey

4. **Iniciar MongoDB**
   ```bash
   # Si usas MongoDB local
   mongod
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   yarn dev
   # o
   npm run dev
   ```

6. **Acceder a las interfaces**
   - Panel de administración: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Documentación API (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Crea tu primer usuario administrador

## 🏗️ Estructura del Proyecto

```
uni-web/
├── src/
│   ├── collections/          # Definiciones de colecciones
│   │   ├── Acceso Rapido/   # Calendario y comunicados
│   │   ├── Areas de Conocimiento/  # Áreas y carreras
│   │   ├── Canales/         # Canales de comunicación
│   │   ├── Investigaciones/ # Investigación académica
│   │   └── Organizacion/    # Estructura institucional
│   ├── media/               # Archivos subidos
│   ├── payload.config.ts    # Configuración principal de Payload
│   └── server.ts            # Servidor Express
├── .env.example             # Variables de entorno de ejemplo
├── package.json             # Dependencias del proyecto
└── tsconfig.json            # Configuración de TypeScript
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
yarn dev                      # Inicia servidor de desarrollo

# Producción
yarn build                    # Compila el proyecto
yarn serve                    # Sirve la versión de producción

# Utilidades
yarn generate:types           # Genera tipos de TypeScript
yarn generate:graphQLSchema   # Genera esquema GraphQL
```

## 🔧 Producción

### Build

1. **Compilar el proyecto**
   ```bash
   yarn build
   ```

2. **Servir en producción**
   ```bash
   yarn serve
   ```

### Variables de Entorno para Producción

Asegúrate de configurar:
- `NODE_ENV=production`
- `DATABASE_URI` con tu base de datos de producción
- `PAYLOAD_SECRET` con un secreto fuerte y único
- `PAYLOAD_PUBLIC_SERVER_URL` con tu URL de producción

## 🌐 API

### 📚 Documentación Completa

**Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

La documentación interactiva incluye:
- ✅ Todos los endpoints de lectura (GET) de las 24 colecciones
- ✅ Ejemplos de respuestas
- ✅ Parámetros de consulta (filtros, paginación, ordenamiento)
- ✅ Códigos de respuesta HTTP
- ✅ Pruebas interactivas desde el navegador

**Nota**: La API es de **solo lectura** para consumo público. Los endpoints de escritura (POST, PATCH, DELETE) están disponibles pero no documentados en Swagger ya que son solo para uso interno del panel de administración.

### REST API
Endpoints de lectura disponibles:
```
GET    /api/{collection}      # Listar documentos
GET    /api/{collection}/:id  # Obtener documento por ID
```

**Ejemplo:**
```bash
# Listar noticias
GET /api/noticias?limit=10&sort=-fecha

# Obtener noticia específica
GET /api/noticias/64a1b2c3d4e5f6g7h8i9j0k1

# Filtrar eventos futuros
GET /api/eventos?where[fechaInicio][greater_than_equal]=2025-01-01
```

### GraphQL
Endpoint GraphQL disponible en:
```
POST /api/graphql
```

**Ejemplo:**
```graphql
query {
  Noticias(limit: 5, sort: "-fecha") {
    docs {
      nombre
      descripcionCorta
      fecha
    }
  }
}
```

## 🔒 Seguridad

- Las colecciones tienen acceso de lectura público por defecto
- La escritura requiere autenticación
- Configura `PAYLOAD_SECRET` con un valor fuerte en producción
- Usa HTTPS en producción

## 📖 Documentación

### Documentación del Proyecto
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) - Documentación interactiva de la API
- **Guía de API**: [API_GUIDE.md](./API_GUIDE.md) - Ejemplos y guía de uso completa
- **Chatbot**: [CHATBOT.md](./CHATBOT.md) - Guía completa del chatbot con IA

### Documentación de Payload CMS
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Payload CMS GitHub](https://github.com/payloadcms/payload)

## 🤝 Contribución

Este proyecto es específico para la Universidad Nacional de Ingeniería. Para contribuir, contacta al equipo de desarrollo.

## 📄 Licencia

MIT
