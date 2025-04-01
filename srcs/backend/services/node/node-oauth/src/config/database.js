const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.resolve('/data/database.sqlite');

// Conectar a SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ No se pudo conectar a la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite.');
        console.log(`\tRuta de la base de datos: ${dbPath}`);
    }
    console.log(`\n-------------------------------\n`);
});

// Función para obtener todos los usuarios. TEST
function getAllUsers(callback) {
    console.log(`\n-------------------------------\n`);
    console.log('🔍 Obteniendo todos los usuarios...');
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('❌ Error al obtener usuarios:', err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
    console.log(`\n-------------------------------\n`);
}

function insertUser(username, password, callback) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function(err) {
        if (err) {
            console.error('❌ Error al insertar usuario:', err.message);
            callback(err);
        } else {
            callback(null, { id: this.lastID });
        }
    });
}

// Función para cerrar la conexión a la base de datos
function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('❌ Error al cerrar la base de datos:', err.message);
        } else {
            console.log('✅ Base de datos cerrada.');
        }
    });
}

// Manejar la señal de cierre del proceso
process.on('SIGINT', () => {
    closeDatabase();
    process.exit(0);
});



// Exportar la base de datos y la función para obtener usuarios
module.exports = {
    db,
    getAllUsers,
    insertUser,
    closeDatabase
};