"use strict";

const fp = require("fastify-plugin");
const httpProxy = require("@fastify/http-proxy");

const getAllowedHttpMethods = (routes) => {
  // Default methods
  const defaultMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

  // If no routes defined, use default methods
  if (!routes || Object.keys(routes).length === 0) return defaultMethods;

  const methods = new Set();

  // Always include OPTIONS
  methods.add("OPTIONS");

  // Add methods from service configurations
  for (const routeConfig of Object.values(routes)) {
    if (typeof routeConfig === "object" && routeConfig.method) {
      const methodArray = Array.isArray(routeConfig.method)
        ? routeConfig.method
        : [routeConfig.method];
      methodArray.forEach((method) => methods.add(method.toUpperCase()));
    }
  }

  // If no methods defined, use default methods
  if (methods.size <= 1) return defaultMethods;

  return Array.from(methods);
};


async function proxyPlugin(fastify, options) {
  const { services, routeMap } = fastify.config;

  // Add a preHandler hook to check allowed methods
  fastify.addHook("preHandler", async (request, reply) => {
    const url = request.url;
    const method = request.method;

    // Find matching service prefix
    let serviceName = null;
    let prefix = null;

    for (const [routePrefix, svcName] of Object.entries(routeMap)) {
      if (url.startsWith(routePrefix)) {
        prefix = routePrefix;
        serviceName = svcName;
        break;
      }
    }

    // Not a proxied route, continue to next handler
    if (!serviceName || !services[serviceName]) return;

    // Get service and route configuration
    const service = services[serviceName];
    const routePath = url.substring(prefix.length).split("?")[0];

    // Find matching route and methods
    let allowedMethods = null;

    if (service.routes && service.routes[routePath]) {
      const routeConfig = service.routes[routePath];

      if (typeof routeConfig === "object") {
         // Get required methods
        if (routeConfig.method) {
          allowedMethods = Array.isArray(routeConfig.method)
            ? routeConfig.method.map((m) => m.toUpperCase())
            : [routeConfig.method.toUpperCase()];
        }
      }
    }

    // Check if the method is allowed
    if (allowedMethods && !allowedMethods.includes(method)) {
      // Log attempt of a non-allowed method
      console.warn("Method not allowed", {
        url: request.url,
        method: request.method,
        allowedMethods: allowedMethods.join(", "),
        service: serviceName,
      });

      reply.code(405).send({
        statusCode: 405,
        error: "Method Not Allowed",
        message: `This endpoint only accepts ${allowedMethods.join(", ")} requests`,
      });
      return reply;
    }
  });

  // Register a proxy for each service
  for (const [serviceName, serviceConfig] of Object.entries(services)) {
    const {
      url,
      prefix,
      routes = {},
      proxyOptions = {},
      timeout,
    } = serviceConfig;

    // Determine allowed HTTP methods
    const httpMethods = getAllowedHttpMethods(routes);

    fastify.register(httpProxy, {
      upstream: url,
      prefix: prefix,
      http2: false,

      // Add preValidation to validate routes
      preValidation: (request, reply, done) => {
        // Get the route path by removing the prefix from the URL
        const routePath = request.url.substring(prefix.length).split("?")[0];

        // Check if the route is defined in the service configuration
        if (!routes[routePath]) {
          console.warn("Route not found", {
            url: request.url,
            routePath: routePath,
            service: serviceName,
          });

          return reply.code(404).send({
            statusCode: 404,
            error: "Not Found",
            message: `Route ${routePath} not found`,
          });
        }

        done();
      },

      replyOptions: {
        rewriteRequestHeaders: (req, headers) => {
          // Add relevant headers
          headers["x-forwarded-proto"] = req.protocol;
          headers["x-forwarded-host"] = req.headers.host;

          // Custom headers to identify requests
          headers["x-source"] = "gateway";
          headers["x-target"] = serviceName;
          headers["x-request-id"] = `${req.ip.replace(/[.:]/g, '-')}_${req.url.replace(/[\/?.]/g, '-')}_${Date.now()}`;
          headers["x-gateway-timestamp"] = Date.now().toString();

          // Apply custom header rewrites specific to the service
          if (proxyOptions.rewriteRequestHeaders)
            headers = proxyOptions.rewriteRequestHeaders(req, headers);

          return headers;
        },
      },
      httpMethods: httpMethods,
      timeout: timeout,
      ...proxyOptions,
    });
  }

  // Capture proxy errors
  fastify.setErrorHandler((error, request, reply) => {
    // Handle timeout errors
    if (error.code === "ETIMEDOUT") {
      console.error("Service timeout", {
        error: error.message,
        service: request.headers["x-target"],
      });

      reply.status(408).send({
        statusCode: 408,
        error: "Request Timeout",
        message: "Service took too long to respond",
      });
      return;
    }

    // Handle connection errors
    if (error.code === "ECONNREFUSED" || error.code === "ECONNRESET") {
      console.error("Service Unavailable", {
        error: error.message,
        service: request.headers["x-target"],
      });

      reply.status(503).send({
        statusCode: 503,
        error: "Service Unavailable",
        message: "Service temporarily unavailable",
      });
      return;
    }

    // For other errors, delegate to the global error handler
    reply.send(error);
  });
}

module.exports = fp(proxyPlugin, { name: "proxy" });
