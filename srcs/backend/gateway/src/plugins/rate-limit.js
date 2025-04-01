"use strict";

const fp = require("fastify-plugin");

async function rateLimitPlugin(fastify, options) {
  // Extract rate limits for routes
  const routeRateLimits = [];
  
  // Add specific limit for /health
  routeRateLimits.push({
    pattern: "/health",
    method: "GET",
    limit: { max: 20, timeWindow: 10 }
  });

  // Get OAuth service configuration from fastify.config
  const oauthService = fastify.config?.services?.oauth;
  
  // Process OAuth service routes if they exist
  if (oauthService && oauthService.routes && oauthService.prefix) {
    Object.entries(oauthService.routes).forEach(([key, route]) => {
      if (route && route.rateLimit) {
        // Make sure method is an array
        const methods = Array.isArray(route.method) ? route.method : ["GET"];
        
        // For each HTTP method defined in the route
        methods.forEach(method => {
          routeRateLimits.push({
            pattern: `${oauthService.prefix}${key}`,
            method: method,
            limit: route.rateLimit
          });
        });
      }
    });
  }

  // Global rate-limit configuration
  await fastify.register(require("@fastify/rate-limit"), {
    trustProxy: true,
    global: true,
    max: 100,
    timeWindow: 60 * 1000,

    // Add standard headers
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
      "retry-after": true,
    },

    // Generate keys per request
    keyGenerator: (req) => `${req.ip}:${req.url}`,

    // Determine max requests per request
    max: (req, key) => {
      for (const route of routeRateLimits) {
        if (
          (route.method === "*" || route.method === req.method) &&
          req.url.startsWith(route.pattern)
        )
          return route.limit.max;
      }
      return 100;
    },

    // Determine time window per request
    timeWindow: async (req, key) => {
      for (const route of routeRateLimits) {
        if (
          (route.method === "*" || route.method === req.method) &&
          req.url.startsWith(route.pattern)
        )
          return route.limit.timeWindow * 1000;
      }
      return 60 * 1000;
    },

    // Log when limit is exceeded
    onExceeded: (req) => {
      for (const route of routeRateLimits) {
        if (
          (route.method === "*" || route.method === req.method) &&
          req.url.startsWith(route.pattern)
        ) {
          console.warn(`Rate-Limit: Request from ${req.ip} to ${req.method} ${req.url} blocked. Limit of ${route.limit.max} requests in ${route.limit.timeWindow} seconds exceeded.`);
          return;
        }
      }

      console.warn(`Rate-Limit: Request from ${req.ip} to ${req.method} ${req.url} blocked. Limit of 100 requests in 60 seconds exceeded.`);
      return;
    },

    // Response for rate limit exceeded
    errorResponseBuilder: (req, context) => {
      let message = `Too many requests. Please try again in ${context.after} seconds.`;

      // Check for specific route rate limits
      for (const route of routeRateLimits) {
        if (
          (route.method === "*" || route.method === req.method) &&
          req.url.startsWith(route.pattern)
        ) {
          message = `Rate limit exceeded for ${route.pattern}. Please try again in ${context.after} seconds.`;
          break;
        }
      }

      return {
        statusCode: 429,
        error: "Too Many Requests",
        message: message,
      };
    },
  });
}

module.exports = fp(rateLimitPlugin, { name: "rate-limit" });
