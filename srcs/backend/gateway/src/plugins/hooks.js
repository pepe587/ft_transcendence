"use strict";

const fp = require("fastify-plugin");

async function securityHooksPlugin(fastify, options) {

  fastify.addHook("onRequest", (request, reply, done) => {
    // HTTPS Enforcement
    if (request.headers["x-forwarded-proto"] !== "https") {
      console.info("HTTPS redirect enforced", {
        url: request.url,
        method: request.method,
        ip: request.ip,
        userAgent: request.headers["user-agent"],
      });
  
      reply.redirect(`https://${request.hostname}${request.url}`);
      return done();
    }
    done();
  });

  fastify.addHook("onSend", (request, reply, payload, done) => {
    // Cache-Control Headers
    if (!reply.hasHeader("Cache-Control")) {
      reply.header(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      reply.header("Pragma", "no-cache");
      reply.header("Expires", "0");
    }
  
    // Response size limits (1 MB)
    const maxSize = 1 * 1024 * 1024;
    if (payload && payload.length > maxSize) {
      console.warn("Response size exceeds limit", {
        url: request.url,
        method: request.method,
        size: payload.length,
        limit: maxSize,
      });
  
      const errorResponse = JSON.stringify({
        statusCode: 413,
        error: "Payload Too Large",
        message: "Response size exceeds maximum allowed size"
      });
      
      reply.code(413);
      return done(null, errorResponse);
    }
  
    done(null, payload);
  });
}

module.exports = fp(securityHooksPlugin, { name: "hooks" });
