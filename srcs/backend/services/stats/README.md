# Ejemplo de Uso de Base de Datos en Fastify

## Descripción General
Este ejemplo muestra las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para una API de usuarios utilizando Fastify y un plugin de base de datos SQLite.

## Rutas de la API

### 1. Crear Usuario
```javascript
server.post('/users', async (request, reply) => {
  try {
    const { username, email } = request.body;
    const user = await server.userDB.createUser(username, email);
    return reply.send(user);
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
});
```
- **Método HTTP**: POST
- **Ruta**: `/users`
- **Función**: Crea un nuevo usuario
- **Parámetros de entrada**: 
  - `username`: Nombre de usuario único
  - `email`: Correo electrónico único
- **Respuestas**:
  - `200`: Usuario creado exitosamente
  - `400`: Error en la creación (ej. usuario duplicado)

### 2. Listar Usuarios
```javascript
server.get('/users', async (request, reply) => {
  const { limit = 10, offset = 0 } = request.query;
  const users = await server.userDB.listUsers(
    Number(limit), 
    Number(offset)
  );
  return reply.send(users);
});
```
- **Método HTTP**: GET
- **Ruta**: `/users`
- **Función**: Obtiene una lista de usuarios
- **Parámetros de consulta**:
  - `limit`: Número máximo de usuarios (predeterminado: 10)
  - `offset`: Desplazamiento para paginación (predeterminado: 0)
- **Respuesta**: Lista de usuarios

### 3. Obtener Usuario por ID
```javascript
server.get('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const user = await server.userDB.getUserById(Number(id));
  
  if (!user) {
    return reply.status(404).send({ error: 'Usuario no encontrado' });
  }
  
  return reply.send(user);
});
```
- **Método HTTP**: GET
- **Ruta**: `/users/:id`
- **Función**: Obtiene detalles de un usuario específico
- **Parámetros de ruta**:
  - `id`: Identificador único del usuario
- **Respuestas**:
  - `200`: Detalles del usuario
  - `404`: Usuario no encontrado

### 4. Actualizar Usuario
```javascript
server.put('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const { username, email } = request.body;
  
  try {
    const updatedUser = await server.userDB.updateUser(
      Number(id), 
      { username, email }
    );
    return reply.send(updatedUser);
  } catch (error) {
    return reply.status(400).send({ error: error.message });
  }
});
```
- **Método HTTP**: PUT
- **Ruta**: `/users/:id`
- **Función**: Actualiza los datos de un usuario
- **Parámetros**:
  - `id`: Identificador del usuario
  - `username`: Nuevo nombre de usuario (opcional)
  - `email`: Nuevo correo electrónico (opcional)
- **Respuestas**:
  - `200`: Usuario actualizado exitosamente
  - `400`: Error en la actualización

### 5. Eliminar Usuario
```javascript
server.delete('/users/:id', async (request, reply) => {
  const { id } = request.params;
  
  const deleted = await server.userDB.deleteUser(Number(id));
  
  if (!deleted) {
    return reply.status(404).send({ error: 'Usuario no encontrado' });
  }
  
  return reply.send({ message: 'Usuario eliminado' });
});
```
- **Método HTTP**: DELETE
- **Ruta**: `/users/:id`
- **Función**: Elimina un usuario
- **Parámetros de ruta**:
  - `id`: Identificador del usuario a eliminar
- **Respuestas**:
  - `200`: Usuario eliminado exitosamente
  - `404`: Usuario no encontrado

## Consideraciones Importantes
- Todas las rutas incluyen manejo básico de errores
- Se convierte el `id` a número para evitar problemas de tipo
- Se utilizan métodos asincrónicos para operaciones de base de datos
- La API sigue principios REST para operaciones CRUD