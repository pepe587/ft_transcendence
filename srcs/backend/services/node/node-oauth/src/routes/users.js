const { db, getAllUsers } = require("../config/database");

module.exports = async function (app) {
  // Ruta para obtener todos los usuarios
  app.get("/users", (req, reply) => {
    getAllUsers((err, users) => {
      if (err) {
        reply.status(500).send({ error: "Error al obtener usuarios" });
      } else {
        reply.send(users);
      }
    });
  });

  // Ruta para registrar un nuevo usuario
  app.post("/signup", (req, reply) => {
    const { email, password } = req.body;
    console.log("🔐 Solicitud de registro recibida");
    console.log(`\n\n\n\n`);
    console.log(req.body.email);
    if (!email || !password) {
      return reply.status(400).send({ error: "Missing data" });
    }

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [email, password], function (err) {
      if (err) {
        console.error("❌ Error al registrar usuario:", err.message);
        reply.status(500).send({ error: "Error al registrar usuario" });
      } else {
        console.log("✅ Usuario registrado");
        reply.send({ status: "ok", userId: this.lastID });
      }
    });
  });
};
