// Esta es la entrada del microservicio

// Desde aqui se crea el servidor, se cargan configuraciones, rutas, etc.

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
let loggedIn = false;
let access_token;
app.register(fastifyCors, {
    origin: '*', // Permitir todas las conexiones (ajusta si es necesario)
});
app.register(fastifyWebSocket);
let clients = [];

app.get('/ws', { websocket: true }, (connection, req) => {
    console.log('Cliente conectado');
    clients.push(connection);
    connection.on('close', () => {
        console.log('Cliente desconectado');
        clients = clients.filter(c => c !== connection);
    });
});

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

app.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Backend is running on ${address}`);
});
console.log('Backend started');