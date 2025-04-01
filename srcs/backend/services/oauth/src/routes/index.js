"use strict";

async function routes(fastify, options) {
  fastify.register(require("./health"));
  fastify.register(require("./auth"));
  fastify.register(require("./login"));

}

module.exports = routes;