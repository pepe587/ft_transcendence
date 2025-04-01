
module.exports = async function (app) {
  let loggedIn = new Map();

  app.post("/login", (req, reply) => {
    console.log("🔐 Solicitud de login recibida");
    console.log(`\n\n\n\n`);
    console.log(req.body.email);
    console.log(req.body);
    console.log(`\n\n\n\n`);

    console.log("✅ Usuario autenticado");
    reply.send({ status: "ok" });
  });
};
