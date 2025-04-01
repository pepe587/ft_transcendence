"use strict";

async function routes(fastify, options) {
  fastify.register(require("./health"));

  fastify.get("/", (request, reply) => {
    reply.send({ message: `${new Date().toISOString()} Hello from Gateway` });
  });
}

module.exports = routes;
