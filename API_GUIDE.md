# Guía de Uso de la API - UniWeb

## 📚 Documentación Interactiva

La documentación completa de la API está disponible en Swagger UI:

**URL**: `http://localhost:3000/api-docs`

## 📖 API de Solo Lectura

Esta API está diseñada para **consumo público de solo lectura**. Todos los endpoints documentados en Swagger son de tipo GET y no requieren autenticación.

Los endpoints de escritura (POST, PATCH, DELETE) existen pero están destinados únicamente para uso interno a través del panel de administración y no están documentados en Swagger.

## 📖 Endpoints Principales

### Noticias

#### Listar Noticias
```bash
GET /api/noticias?limit=10&page=1&sort=-fecha
```

#### Obtener Noticia por ID
```bash
GET /api/noticias/64a1b2c3d4e5f6g7h8i9j0k1
```

### Eventos

#### Listar Eventos Futuros
```bash
GET /api/eventos?where[fechaInicio][greater_than_equal]=2025-01-01&sort=fechaInicio
```

#### Obtener Evento por ID
```bash
GET /api/eventos/64a1b2c3d4e5f6g7h8i9j0k1
```

### Carreras

#### Listar Carreras
```bash
GET /api/carrera?limit=20
```

#### Buscar Carrera por Nombre
```bash
GET /api/carrera?where[nombre][like]=Ingeniería
```

#### Obtener Carrera con Relaciones
```bash
GET /api/carrera/64a1b2c3d4e5f6g7h8i9j0k1?depth=2
```

### Media (Archivos)

#### Listar Imágenes
```bash
GET /api/media?where[mimeType][like]=image/
```

#### Obtener Archivo por ID
```bash
GET /api/media/64a1b2c3d4e5f6g7h8i9j0k1
```

### Recintos

#### Listar Recintos
```bash
GET /api/recintos
```

#### Obtener Recinto Específico
```bash
GET /api/recintos/64a1b2c3d4e5f6g7h8i9j0k1
```

## 🔍 Parámetros de Consulta Comunes

### Paginación
- `limit`: Número de resultados por página (default: 10)
- `page`: Número de página (default: 1)

```bash
GET /api/noticias?limit=20&page=2
```

### Ordenamiento
- `sort`: Campo por el cual ordenar
- Prefijo `-` para orden descendente

```bash
GET /api/noticias?sort=-fecha
GET /api/eventos?sort=nombre
```

### Filtros
Usa la sintaxis `where[campo][operador]=valor`

**Operadores disponibles:**
- `equals`: Igual a
- `not_equals`: Diferente de
- `like`: Contiene (búsqueda parcial)
- `contains`: Contiene
- `in`: Está en array
- `greater_than`: Mayor que
- `greater_than_equal`: Mayor o igual que
- `less_than`: Menor que
- `less_than_equal`: Menor o igual que

**Ejemplos:**
```bash
# Buscar noticias que contengan "tecnología"
GET /api/noticias?where[nombre][like]=tecnología

# Eventos desde una fecha
GET /api/eventos?where[fechaInicio][greater_than_equal]=2025-01-01

# Múltiples filtros
GET /api/noticias?where[nombre][like]=uni&where[fecha][greater_than]=2025-01-01
```

### Profundidad de Relaciones
- `depth`: Nivel de expansión de relaciones (0-10)

```bash
# Sin expandir relaciones (solo IDs)
GET /api/areas-de-conocimiento?depth=0

# Expandir 1 nivel
GET /api/areas-de-conocimiento?depth=1

# Expandir 2 niveles
GET /api/areas-de-conocimiento?depth=2
```

## 🎯 GraphQL

### Endpoint
```
POST /api/graphql
```

### Ejemplo: Listar Noticias
```graphql
query {
  Noticias(limit: 5, sort: "-fecha") {
    docs {
      id
      nombre
      descripcionCorta
      fecha
      imagen {
        url
        filename
      }
    }
    totalDocs
    hasNextPage
  }
}
```

### Ejemplo: Obtener Evento por ID
```graphql
query GetEvento($id: String!) {
  Evento(id: $id) {
    nombre
    descripcion
    fechaInicio
    fechaFin
    ubicacion
  }
}
```

**Variables:**
```json
{
  "id": "64a1b2c3d4e5f6g7h8i9j0k1"
}
```

### Ejemplo: Crear Noticia (Mutación)
```graphql
mutation CreateNoticia($data: mutationNoticiaInput!) {
  createNoticia(data: $data) {
    id
    nombre
    slug
  }
}
```

**Variables:**
```json
{
  "data": {
    "nombre": "Nueva noticia",
    "slug": "nueva-noticia",
    "descripcionCorta": "Descripción breve",
    "fecha": "2025-01-15",
    "imagen": "64a1b2c3d4e5f6g7h8i9j0k1"
  }
}
```

## 📊 Estructura de Respuestas

### Respuesta de Lista (Paginada)
```json
{
  "docs": [
    {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "nombre": "Ejemplo",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "totalDocs": 50,
  "limit": 10,
  "totalPages": 5,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

### Respuesta de Documento Individual
```json
{
  "id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "nombre": "Ejemplo",
  "descripcion": "Contenido...",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

### Respuesta de Error
```json
{
  "errors": [
    {
      "message": "Descripción del error"
    }
  ]
}
```

## 🚀 Ejemplos con cURL

### Listar Noticias
```bash
curl -X GET "http://localhost:3000/api/noticias?limit=5&sort=-fecha"
```

### Obtener Noticia por ID
```bash
curl -X GET "http://localhost:3000/api/noticias/64a1b2c3d4e5f6g7h8i9j0k1"
```

### Listar Eventos Futuros
```bash
curl -X GET "http://localhost:3000/api/eventos?where[fechaInicio][greater_than_equal]=2025-01-01"
```

### Consulta GraphQL
```bash
curl -X POST "http://localhost:3000/api/graphql" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { Noticias(limit: 5) { docs { nombre fecha } } }"
  }'
```

## 📝 Colecciones Disponibles

1. **users** - Usuarios del sistema
2. **noticias** - Noticias y publicaciones
3. **eventos** - Eventos universitarios
4. **areas-de-conocimiento** - Facultades y departamentos
5. **carrera** - Programas académicos
6. **investigaciones** - Proyectos de investigación
7. **investigacion-area** - Áreas de investigación
8. **posgrado** - Programas de posgrado
9. **organizacionUNI** - Estructura organizacional
10. **cargos** - Cargos y autoridades
11. **divisiones** - Divisiones administrativas
12. **recintos** - Campus y sedes
13. **contactanos** - Información de contacto
14. **multimedia** - Contenido multimedia
15. **media** - Archivos y medios
16. **canales** - Canales de comunicación
17. **subCanales** - Subcanales
18. **redesSociales** - Redes sociales
19. **calendarioAcademico** - Calendario académico
20. **comunicados** - Comunicados oficiales
21. **estadisticas** - Estadísticas
22. **inicio** - Contenido de inicio
23. **extension** - Programas de extensión
24. **footer** - Contenido del footer

## 🔗 Enlaces Útiles

- **Documentación Swagger**: http://localhost:3000/api-docs
- **Panel Admin**: http://localhost:3000/admin
- **GraphQL Endpoint**: http://localhost:3000/api/graphql
- **API Base URL**: http://localhost:3000/api

## 💡 Tips

1. **Usa Swagger UI** para explorar y probar los endpoints interactivamente en http://localhost:3000/api-docs
2. **Usa `depth`** para controlar cuánta información de relaciones necesitas (0-10)
3. **Filtra y ordena** para obtener exactamente los datos que necesitas usando parámetros `where` y `sort`
4. **GraphQL** es ideal para obtener datos específicos y evitar over-fetching
5. **Todos los endpoints GET son públicos** - no requieren autenticación
