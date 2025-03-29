const { getAllUsers } = require('../config/database');

module.exports = async function (app) {
    // Ruta para obtener todos los usuarios
    app.get('/api/users', (req, reply) => {
        getAllUsers((err, users) => {
            if (err) {
                reply.status(500).send({ error: 'Error al obtener usuarios' });
            } else {
                reply.send(users);
            }
        });
    });
};