"use strict";

async function healthRoutes(fastify, options) {
  fastify.get("/health", async (request, reply) => {
      const serviceStatus = {
        service: {
          name: fastify.config.name,
          status: "up",
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          version: fastify.config.version,
        },
      };
      return serviceStatus;
    }
  );
}

module.exports = healthRoutes;
