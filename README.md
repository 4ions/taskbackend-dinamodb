# Gestor de Tareas

Esta es una aplicación simple de gestión de tareas construida con TypeScript y AWS DynamoDB.

## Funcionalidad

La aplicación proporciona las siguientes funciones para gestionar tareas:

### Crear Tarea

Crear una nueva tarea con un nombre de tarea y detalles opcionales.

```typescript
async function createTask(task: string, details?: string): Promise<boolean>
```

### Obtener Todas las tareas

Recuperar todas las tareas almacenadas en la base de datos, con soporte para paginación.

```typescript
async function getAllTask(lastEvaluatedKey?: DynamoDB.DocumentClient.Key): Promise<{ tasks: Task[], lastEvaluatedKey?: DynamoDB.DocumentClient.Key }>
```

### Obtener Tarea por ID

Recuperar una tarea específica por su ID.

```typescript
function getTask(id: string): Promise<Task>
```

### Actualizar Tarea

Actualizar una tarea con un nuevo nombre de tarea y detalles opcionales.

```typescript
async function updateTask(id: string, task: string, details?: string): Promise<boolean>
```

### Eliminar Tarea

Eliminar una tarea por su ID.

```typescript
async function deleteTask(id: string): Promise<boolean>
```

### Instalación

- Clona el repositorio: git [clone https://github.com/tu-usuario/gestor-de-tareas.git](https://github.com/4ions/taskbackend-dinamodb)
- Instala las dependencias: npm install
- Configura tus credenciales de AWS en las variables de entorno o un .env donde
  ```env
  PORT
  REGION
  AWS_ACCESS_KEY
  AWS_SECRET_KEY
  ```
  
- Actualiza el nombre de la tabla de DynamoDB en el código para que coincida con tu configuración.
- Inicia la aplicación: npm run build & npm start

### Pruebas
Para ejecutar las pruebas unitarias de la aplicación, usa el siguiente comando:
```bash
npm run test
```

## Rutas

### Crear Tarea

Realiza una petición POST a /api/ para crear una nueva tarea.

#### Request:
```http
POST /api/
Content-Type: application/json

{
  "task": "Nombre de la tarea",
  "details": "Detalles de la tarea (opcional)"
}
```
#### Response:

200 OK: La tarea se ha creado exitosamente.
400 Bad Request: No se proporcionó el nombre de la tarea en la solicitud.

```json
{
  "data": true
}
```

### Obtener Todas las Tareas
Realiza una petición GET a /api/ para obtener todas las tareas almacenadas en el sistema.

#### Request:
```http
GET /api/
```

#### Response:

200 OK: Las tareas se obtuvieron correctamente.

```json
{
  "data": {
    "tasks": [
      {
        "taskId": "1",
        "name": "Nombre de la tarea 1",
        "details": "Detalles de la tarea 1"
      },
      {
        "taskId": "2",
        "name": "Nombre de la tarea 2",
        "details": "Detalles de la tarea 2"
      }
    ],
    "lastEvaluatedKey": {
      "taskId": "lastKey"
    }
  }
}
```

### Obtener Tarea por ID
Realiza una petición GET a /api/:id para obtener una tarea específica por su ID.

#### Request:

```http
GET /api/:id
```

#### Response:

200 OK: La tarea se obtuvo correctamente.
400 Bad Request: No se proporcionó el ID de la tarea en la solicitud.
404 Not Found: La tarea no fue encontrada.

```json
{
  "data": {
    "taskId": "1",
    "name": "Nombre de la tarea",
    "details": "Detalles de la tarea"
  }
}
```

### Actualizar Tarea
Realiza una petición PUT a /api/:id para actualizar una tarea existente por su ID.

#### Request:

```http
PUT /api/:id
Content-Type: application/json

{
  "task": "Nuevo nombre de la tarea",
  "details": "Nuevos detalles de la tarea"
}
```

#### Response:

200 OK: La tarea se actualizó correctamente.
400 Bad Request: No se proporcionó el ID de la tarea en la solicitud.
404 Not Found: La tarea no fue encontrada.

```json
{
  "data": true
}
```

### Eliminar Tarea
Realiza una petición DELETE a /api/:id para eliminar una tarea existente por su ID.

#### Request:

```http
DELETE /api/:id
```

#### Response:

200 OK: La tarea se eliminó correctamente.
400 Bad Request: No se proporcionó el ID de la tarea en la solicitud.

```json
{
  "data": true
}
```

## Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias de mejora, por favor, abre un issue o envía un pull request.
