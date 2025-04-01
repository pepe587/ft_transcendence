const { db } = require("../config/database");

module.exports = async function (app) {
  let loggedIn = new Map();

  // GET de prueba
  app.get("/test", (req, reply) => {
    console.log("Solicitud GET de prueba recibida");

    reply.send({
      status: "ok",
      message: "Endpoint de prueba funcionando correctamente",
      timestamp: new Date().toISOString(),
    });
  });

  app.post("/login", (req, reply) => {
    console.log(`\n-------------------------------\n`);
    console.log("🔐 Solicitud de login recibida");
    console.log(req.body);

    //enviar datos a la base de datos
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(query, [req.body.email, req.body.password], (err, row) => {
      if (err) {
        console.error("❌ Error al obtener usuario:", err.message);
        reply.status(500).send({ error: "Error al obtener usuario" });
      } else if (row) {
        loggedIn.set(req.body.email, true);
        console.log("✅ Usuario autenticado");
        reply.send({ status: "ok" });
      } else {
        console.log("❌ Usuario no encontrado");
        reply.send({ status: "error" });
      }
    });
  console.log(`\n-------------------------------\n`);
  });
};
