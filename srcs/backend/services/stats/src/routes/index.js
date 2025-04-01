"use strict";

async function routes(fastify, options) {
  fastify.register(require("./health"));

}

module.exports = routes;