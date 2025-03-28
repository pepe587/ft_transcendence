module.exports = async function (app) {
    let clients = [];

    app.get('/ws', { websocket: true }, (connection) => {
        console.log('Cliente conectado');
        clients.push(connection);

        connection.on('close', () => {
            console.log('Cliente desconectado');
            clients = clients.filter(c => c !== connection);
        });
    });
};