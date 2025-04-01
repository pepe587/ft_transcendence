"use strict";

const fp = require("fastify-plugin");
const SQLite = require("better-sqlite3");
const path = require("path");

async function dbPlugin(fastify, options) {
  // Crear conexión a la base de datos SQLite
  const dbPath = path.resolve(options.database.path || './database.sqlite');
  const db = new SQLite(dbPath);

  // Crear tabla de usuarios de ejemplo
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Decorar Fastify con métodos de base de datos
  fastify.decorate("userDB", {
    // Crear un nuevo usuario
    async createUser(username, email) {
      try {
        const stmt = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
        const result = stmt.run(username, email);
        return { 
          id: result.lastInsertRowid, 
          username, 
          email 
        };
      } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
          throw new Error('Username or email already exists');
        }
        throw error;
      }
    },

    // Obtener usuario por ID
    async getUserById(id) {
      const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
      return stmt.get(id);
    },

    // Obtener usuario por username
    async getUserByUsername(username) {
      const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
      return stmt.get(username);
    },

    // Listar todos los usuarios
    async listUsers(limit = 10, offset = 0) {
      const stmt = db.prepare(`
        SELECT * FROM users 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
      `);
      return stmt.all(limit, offset);
    },

    // Actualizar usuario
    async updateUser(id, updates) {
      const updateFields = Object.keys(updates)
        .map(key => `${key} = ?`)
        .join(', ');
      
      const values = [...Object.values(updates), id];
      
      const stmt = db.prepare(`
        UPDATE users 
        SET ${updateFields} 
        WHERE id = ?
      `);
      
      stmt.run(values);
      
      return this.getUserById(id);
    },

    // Eliminar usuario
    async deleteUser(id) {
      const stmt = db.prepare('DELETE FROM users WHERE id = ?');
      const result = stmt.run(id);
      return result.changes > 0;
    }
  });

  // Cerrar conexión cuando el servidor se apague
  fastify.addHook("onClose", (instance, done) => {
    if (db) {
      db.close();
    }
    done();
  });
}

module.exports = fp(dbPlugin, { name: "db" });
