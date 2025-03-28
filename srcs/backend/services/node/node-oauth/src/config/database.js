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
    }
});

module.exports = { db };
