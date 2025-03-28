const fastify = require('fastify');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '../../.env' });

// Opciones de HTTPS
const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/server.key'),
    cert: fs.readFileSync('/etc/ssl/certs/server.crt')
};

// Crear el servidor Fastify
const app = fastify({
    logger: true,
    https: httpsOptions
});

// Cargar configuración y módulos
const db  = require('./config/database');
const websocket = require('./plugins/websocket');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');

// Registrar plugins y rutas
app.register(require('@fastify/cors'), { origin: '*' });
app.register(require('@fastify/websocket'));
app.register(websocket);
app.register(authRoutes);
app.register(loginRoutes);

// Iniciar servidor
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`🚀 Backend is running on ${address}`);
});

module.exports = app;
