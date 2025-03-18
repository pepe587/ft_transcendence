# K-Pong

# Documentación API Transcendence

## Ejemplos

```js
let res = await fetch("http://localhost:9000/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT}`,
  },
});
if (!res.ok) handleError();

let res = await fetch("http://localhost:9000/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT}`,
  },
  body: JSON.stringify({
    sender_id: "1",
    chat_id: "1",
    body: "this is a test message",
  }),
});
if (!res.ok) handleError();
```

Si quieres ver más, cf. `srcs/backend/api/dev/dummy.js`

## Endpoints

Todos los endpoints están precedidos de <http://localhost:9000>

La estructura de la documentación es la siguiente:

`METODO` `/endpoint` `parámetros requeridos` Descripción

```json
{
  "respuesta": "a la petición"
}
```

### Auntentificación

Estos endpoints devuelven un JWT / no necesitan un JWT

`POST` `/login` `{username, password, ?totp}` Loguea al usuario,
devuelve toda la info del usuario.

```json
{
  "id": 1,
  "username": "debug",
  "alias": null,
  "email": "debug@gmail.com",
  "avatar": "/usr/transcendence/api/avatars/default.jpg",
  "created_at": "2025-02-21 11:03:03",
  "is_online": 1,
  "last_login": "2025-02-21 11:03:03",
  "reset_token": null,
  "is_deleted": 0,
  "wins": 0,
  "losses": 0,
  "token": "verylongandsecurejwt"
}
```

`POST` `/google/login` `{credential}` Loguea al usuario a
través de Google, creando su cuenta
o accediendo a una existente

Si el usuario existe, el resultado es idéntico al endpoint `/login`,
si no existe, el resultado es idéntico al endpoint `/register`

`POST` `/register` `{username, email, password, confirm_password}` Registra al usuario

```json
{
  "id": 1,
  "username": "debug",
  "email": "debug@gmail.com",
  "token": "verylongandsecurejwt"
}
```

`POST` `/reset` `{email}` Manda un correo al usuario para resetear su contraseña

```json
{
  "accepted": ["user@mail.com"],
  "rejected": [],
  "ehlo": [
    "SIZE 35882577",
    "8BITMIME",
    "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
    "ENHANCEDSTATUSCODES",
    "PIPELINING",
    "CHUNKING",
    "SMTPUTF8"
  ],
  "envelopeTime": 521,
  "messageTime": 587,
  "messageSize": 1042,
  "response": "250 2.0.0 OK  1741175147 ffacd0b85a97d-390e485db82sm20400744f8f.88 - gsmtp",
  "envelope": {
    "from": "transcendence42mlg@gmail.com",
    "to": ["user@mail.com"]
  },
  "messageId": "<0537e65e-6dff-d162-b271-ccfed0392b61@gmail.com>"
}
```

`POST` `/resetToken` `{token, id, password, confirm_password}` Actualiza la contraseña
del usuario si el token de reseteo es correcto

#### 2FA

El endpoint para loguear a un usuario con 2FA es el mismo que
el logueo normal (/login).
Si el usuario ha activado 2FA previamente, se pedirá un TOTP.
Si no se encuentra el token TOTP, el servidor responderá con
`CODE 202` `{message: "2FA is enabled, TOTP code required"}`.
Si se encuentra el token TOTP, se procederá al login de forma habitual,
comprobando el token en el proceso

`GET` `/2fa/enable` Empieza la activación de 2FA

```json
{
  "qr_code": "data:image/png;base64..."
}
```

El usuario deberá escanear el QR y registrarlo con una aplicación para
obtener un código de contraseña temporal (TOTP)

`POST` `/2fa/verify` `{totp_code}` Finaliza la activación del 2FA

```json
{
  "success": "2FA successfully enabled for user with ID 1"
}
```

#### El resto de endpoints requiren un JWT además de lo que cada uno necesite

Es obligatorio mandar un JWT tanto por seguridad como para acceder al ID del
usuario en cuestión, ya que esta información se guarda encriptada en dicho JWT

### Usuarios

`GET` `/users/list` Devuelve el id, username y email de todos los usuarios

```json
[
  {
    "id": 2,
    "username": "foo",
    "email": "foo@gmail.com"
  },
  {
    "id": 3,
    "username": "bar",
    "email": "bar@gmail.com"
  }
]
```

`POST` `/users` `{username, password, email}` Crea un usuario directamente

```json
{
  "id": 1,
  "username": "foo",
  "email": "foo@gmail.com"
}
```

`GET` `/users` Devuelve toda la información de un usuario

```json
{
  "id": 1,
  "username": "debug",
  "alias": null,
  "email": "debug",
  "avatar": "/usr/transcendence/api/avatars/default.jpg",
  "created_at": "2025-02-18 11:39:16",
  "is_online": 0,
  "last_login": "2025-02-18 11:39:16",
  "reset_token": null,
  "wins": 0,
  "losses": 0,
  "friends": [2, 3, 4]
}
```

`PUT` `/users` `{username, password, email}` Modifica completamente un usuario

```json
{
  "id": 1,
  "username": "foo",
  "email": "foo@gmail.com"
}
```

`PATCH` `/users` `{?, ...}` Modifica uno o más campos de un usuario.
Devuelve los campos modificados

```json
{
  "email": "foo@gmail.com"
}
```

`DELETE` `/users` Borra un usuario

`GET` `/users/:str` Devuelve la tabla _str_ en relación al usuario,
donde _str_ puede ser _chats_, _messages_, _matches_ o _tournaments_.
cf. la tabla en cuestión para ver lo que devuelve

`POST` `/users/friends` `{friend_id}` Añade un amigo al usuario

```json
{
  "user_id": "1",
  "friend_id": "2"
}
```

`PATCH` `/users/friends` `{friend_id}` Borra un amigo del usuario

```json
{
  "success": "friend removed"
}
```

`POST` `/users/blocks` `{blocked_id}` Añade un usuario a la lista de
bloqueados de otro usuario

```json
{
  "user_id": 1,
  "blocked_id": 2
}
```

`PATCH` `/users/blocks` `{blocked_id}` Elimina un usuario de la lista de
bloqueados de otro usuario

```json
{
  "success": "block removed"
}
```

### Avatares

`POST` `/avatar` Modifica el avatar del usuario.
Debe incluir `multipart/form-data` en los headers de la request

```json
{
  "message": "File uploaded successfully",
  "id": "1",
  "fileDetails": {
    "filename": "1740139573122-crab.jpg",
    "originalName": "crab.jpg",
    "mimetype": "image/jpeg",
    "size": 54956
  }
}
```

### Chats

`GET` `/chats` Devuelve el id y usuarios de todos los chats

```json
[
  {
    "id": 1,
    "first_user_id": 1,
    "second_user_id": 2
  },
  {
    "id": 2,
    "first_user_id": 2,
    "second_user_id": 3
  },
  {
    "id": 3,
    "first_user_id": 1,
    "second_user_id": 3
  }
]
```

`POST` `/chats` `{first_user_id, second_user_id}` Crea un chat

```json
{
  "id": 1,
  "first_user_id": 1,
  "second_user_id": 2
}
```

`GET` `/chats/:id` Devuelve toda la información de un chat

```json
{
  "id": 1,
  "first_user_id": 1,
  "second_user_id": 2
}
```

`PUT` `/chats/:id` `{first_user_id, second_user_id}` Modifica completamente un chat

```json
{
  "id": 1,
  "first_user_id": 1,
  "second_user_id": 2
}
```

`PATCH` `/chats/:id` `{?, ...}` Modifica uno o más campos de un chat.
Devuelve los campos modificados

```json
{
  "first_user_id": 1
}
```

`DELETE` `/chats/:id` Borra un chat

### Mensajes

`GET` `/messages` Devuelve el id, id del usuario que mandó el mensaje,
id del chat al que pertenece, cuerpo del mensaje y fecha

```json
[
  {
    "id": 1,
    "sender_id": 1,
    "chat_id": 1,
    "body": "this is a test message",
    "sent_at": "2025-02-18 11:39:16"
  },
  {
    "id": 2,
    "sender_id": 1,
    "chat_id": 1,
    "body": "this is another test message",
    "sent_at": "2025-02-18 11:39:16"
  },
  {
    "id": 3,
    "sender_id": 3,
    "chat_id": 3,
    "body": "this is a new test message",
    "sent_at": "2025-02-18 11:39:16"
  }
]
```

`POST` `/messages` `{sender_id, chat_id, body}` Crea un mensaje

```json
{
  "id": 1,
  "sender_id": 1,
  "chat_id": 1,
  "body": "this is a test message"
}
```

`GET` `/messages/:id` Devuelve toda la información de un mensaje

```json
{
  "id": 1,
  "sender_id": 1,
  "chat_id": 1,
  "body": "this is a test message",
  "sent_at": "2025-02-18 11:39:16"
}
```

`PUT` `/messages/:id` `{sender_id, chat_id, body}` Modifica completamente un mensaje

```json
{
  "id": 1,
  "sender_id": 1,
  "chat_id": 1,
  "body": "this is a test message"
}
```

`PATCH` `/messages/:id` `{?, ...}` Modifica uno o más campos de un mensaje.
Devuelve los campos modificados

```json
{
  "body": "this is a modified message"
}
```

`DELETE` `/messages/:id` Borra un mensaje

### Torneos

`GET` `/tournaments` Devuelve el id, nombre del torneo, cantidad de jugadores e
ids de los jugadores

```json
[
  {
    "id": 1,
    "name": "Test tournament",
    "player_amount": 4,
    "player_ids": [1, 2, 3, 4]
  },
  {
    "id": 2,
    "name": "Another test tournament",
    "player_amount": 4,
    "player_ids": [1, 2, 3, 4]
  }
]
```

`POST` `/tournaments` `{name, player_amount, player_ids}` Crea un torneo

```json
{
  "id": 1,
  "name": "Tournament",
  "player_amount": 4,
  "player_ids": [1, 2, 3, 4]
}
```

`GET` `/tournaments/:id` Devuelve toda la información de un torneo

```json
{
  "id": 1,
  "name": "Test tournament",
  "player_amount": 4,
  "player_ids": [1, 2, 3, 4]
}
```

`PUT` `/tournaments/:id` `{name, player_amount, player_ids}`
Modifica completamente un torneo

```json
{
  "id": 1,
  "name": "Test tournament",
  "player_amount": 4,
  "player_ids": [1, 2, 3, 4]
}
```

`PATCH` `/tournaments/:id` `{?, ...}` Modifica uno o más campos de un torneo.
Devuelve los campos modificados

```json
{
  "name": "Modified tournament"
}
```

`DELETE` `/tournaments/:id` Borra un torneo

### Partidas

`GET` `/matches` Devuelve el id, ids de los jugadores, resultado,
id del ganador y perdedor y si pertenece a un torneo

```json
[
  {
    "id": 1,
    "left_player_id": 1,
    "right_player_id": 2,
    "result": [3, 2],
    "winner_id": 1,
    "loser_id": 2,
    "tournament_id": null
  },
  {
    "id": 2,
    "left_player_id": 1,
    "right_player_id": 2,
    "result": [2, 3],
    "winner_id": 2,
    "loser_id": 1,
    "tournament_id": null
  }
]
```

`POST` `/matches` `{right_player_id, left_player_id, result, winner_id, loser_id}`
Crea una partida

```json
{
  "id": 1,
  "left_player_id": 2,
  "right_player_id": 1,
  "result": [3, 2],
  "winner_id": 1,
  "loser_id": 2
}
```

`GET` `/matches/:id` Devuelve toda la información de una partida

```json
{
  "id": 1,
  "left_player_id": 1,
  "right_player_id": 2,
  "result": [3, 2],
  "winner_id": 1,
  "loser_id": 2,
  "tournament_id": null
}
```

`PUT` `/matches/:id` `{right_player_id, left_player_id, result, winner_id, loser_id}`
Modifica completamente una partida

```json
{
  "id": 1,
  "left_player_id": 2,
  "right_player_id": 1,
  "result": [3, 2],
  "winner_id": 1,
  "loser_id": 2
}
```

`PATCH` `/matches/:id` `{?, ...}` Modifica uno o más campos de una partida.
Devuelve los campos modificados

```json
{
  "result": [2, 3],
  "winner_id": 2,
  "loser_id": 1
}
```

`DELETE` `/matches/:id` Borra una partida
