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

// Funciones de la base de datos
    const db  = require('./config/database');
    const { getAllUsers } = require('./config/database');
    const { insertUser } = require('./config/database');
    const { closeDatabase } = require('./config/database');

    //TO DO:
    //const { getUserById } = require('./config/database');
    //const { updateUser } = require('./config/database');
    //const { deleteUser } = require('./config/database');
    //const { getUserByUsername } = require('./config/database');
    //const { getUserByEmail } = require('./config/database');

const websocket = require('./plugins/websocket');

// Rutas
    const authRoutes = require('./routes/auth');
    const loginRoutes = require('./routes/login');
    const usersRoutes = require('./routes/users');

// Registrar plugins y rutas
app.register(require('@fastify/cors'), { origin: '*' });
app.register(require('@fastify/websocket'));
app.register(websocket);
app.register(authRoutes);
app.register(loginRoutes);
app.register(usersRoutes);

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
