"use strict";

const fp = require("fastify-plugin");

async function errorHandlerPlugin(fastify, options) {

  // Not found handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.code(404).send({
      error: "Resource not found",
      path: request.url,
      method: request.method,
    });
  });

  // Error handler
  fastify.setErrorHandler((error, request, reply) => {

    console.error("Request failed", {
      error: error.message,
      url: request.url,
      method: request.method,
      statusCode: error.statusCode || 500,
    });

    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      statusCode,
      error: statusCode >= 500 ? "Internal Server Error" : error.message
    });
  });
}

module.exports = fp(errorHandlerPlugin, { name: "errorHandler" });
