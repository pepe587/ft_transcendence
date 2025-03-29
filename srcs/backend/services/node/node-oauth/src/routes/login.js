const { db } = require('../config/database');

module.exports = async function (app) {
    let loggedIn = new Map();

    app.post('/api/login', (req, reply) => {
        console.log('🔐 Solicitud de login recibida');
        console.log(`\n\n\n\n`);
        console.log(req.body.email);
        console.log(req.body);
        console.log(`\n\n\n\n`);

        //enviar datos a la base de datos
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.get(query, [req.body.email, req.body.password], (err, row) => {
            if (err) {
                console.error('❌ Error al obtener usuario:', err.message);
                reply.status(500).send({ error: 'Error al obtener usuario' });
            } else if (row) {
                loggedIn.set(req.body.username, true);
                console.log('✅ Usuario autenticado');
                reply.send({ status: 'ok' });
            } else {
                console.log('❌ Usuario no encontrado');
                reply.send({ status: 'error' });
            }
        });
    });
};
