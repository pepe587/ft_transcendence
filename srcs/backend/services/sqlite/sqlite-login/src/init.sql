-- Crea una tabla para almacenar los logins
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserta un usuario de ejemplo (opcional)
INSERT OR IGNORE INTO users (username, password) VALUES ('test', 'test');