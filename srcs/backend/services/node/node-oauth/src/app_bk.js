// Esta es la entrada del microservicio

// Desde aqui se crea el servidor, se cargan configuraciones, rutas, etc.

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const fastify = require('fastify');
const fastifyCors = require('@fastify/cors');
const fastifyWebSocket = require('@fastify/websocket');
const fastifyOauth2 = require('@fastify/oauth2');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: '../../.env' });

const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/server.key'),
    cert: fs.readFileSync('/etc/ssl/certs/server.crt')
};

// Crear servidor Fastify con HTTPS
const app = fastify({
    logger: true,
    https: httpsOptions
});

// Configuración de OAuth2
app.googleOAuth2 = null;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const googleClientId = process.env.GCLIENT_ID;
const googleClientSecret = process.env.CLIENT_SECRET;
const googleRedirectUri = process.env.RDIR_URI;

let loggedIn = new Map();
let access_token;
app.register(fastifyCors, {
    origin: '*', // Permitir todas las conexiones (ajusta si es necesario)
});
app.register(fastifyWebSocket);
let clients = [];

//WEBSOCKET
app.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Cliente conectado');
    clients.push(connection);
    connection.on('close', () => {
        console.log('Cliente desconectado');
        clients = clients.filter(c => c !== connection);
    });
});

/*LOGICA DE LOGIN CON DATABASE*/

// Ruta al archivo de base de datos dentro del volumen compartido
const dbPath = path.resolve('/data/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ No se pudo conectar a la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite.');
  }
});
module.exports = db;

app.post('/api/login', (req, reply) => {
    console.log('Solicitud de login recibida:');
    // Aquí puedes procesar el mensaje y enviar una respuesta

    console.log(req.body);
    if (loggedIn)
        reply.send({ status: 'ok' });
    else
        reply.send({ status: 'error' });
});
/*FIN DE LA LOGICA DE LOGIN CON DATABASE*/

/* LOGICA OAUTH2 */
app.get('/api/oauth', (req, reply) => {
    console.log('OAuth request received');
    reply.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=profile email`);
});

app.get('/api/callback', async (req, res) => {
    console.log("\n\n\n\n\n\n\n\nHandling callback ...\n\n\n\n\n\n\n");
    let code = req.query.code;
    try {
        const response = await app.inject({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            payload: {
                client_id: googleClientId,
                client_secret: googleClientSecret,
                redirect_uri: googleRedirectUri,
                code: code,
                grant_type: 'authorization_code'
            }
        });
        const responseBody = JSON.parse(response.body);
        access_token = responseBody.access_token;
        console.log(`Access token received`);
        // Redirigir a la página principal
        res.redirect('https://localhost:8443');
        loggedIn = true;
        //clients.forEach(client => client.socket.send(JSON.stringify(true)));
    }
    catch (error) {
        console.error('Error during callback handling:', error);
        res.send('An error occurred');
    }
});
/*FIN DE LOGICA OAUTH2*/



app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Backend is running on ${address}`);
});
console.log('Backend started');