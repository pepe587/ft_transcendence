const { db } = require('../config/database');

module.exports = async function (app) {
    let loggedIn = new Map();

    app.post('/api/login', (req, reply) => {
        console.log('🔐 Solicitud de login recibida');
        console.log(req.body);

        if (loggedIn.has(req.body.username)) {
            reply.send({ status: 'ok' });
        } else {
            reply.send({ status: 'error' });
        }
    });
};
