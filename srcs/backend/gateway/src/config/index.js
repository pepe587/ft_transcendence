"use strict";

require("dotenv").config();

const services = require("./services");

const config = {
  // Server
  serviceName: (process.env.SERVICE_URL && process.env.SERVICE_URL.split(":")[0]) || "gateway",
  port: (process.env.SERVICE_URL && process.env.SERVICE_URL.split(":")[1]) || 3000,
  host: "0.0.0.0", version: "1.0",

  // Services
  services: services.services,
  routeMap: services.routeMap,

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },

  helmet: {
    // Disable CSP since we are not serving HTML/CSS/JS content directly
    contentSecurityPolicy: false,

    // Disable Frameguard since we are not serving content that can be embedded in iframes
    frameguard: false,

    // Protection against XSS
    xssFilter: true,

    // Prevent MIME sniffing
    noSniff: true,

    // Hide server information
    hidePoweredBy: true,

    // Control referrer policy
    referrerPolicy: {
      policy: "no-referrer",
    },

    // Cross-origin resource policies
    crossOriginResourcePolicy: {
      policy: "same-site",
    },

    // Disable unnecessary policies for API
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,

    // Add HSTS (even though behind nginx)
    strictTransportSecurity: {
      maxAge: 15552000, // 180 days
      includeSubDomains: true,
      preload: true,
    },

    // Prevent DNS prefetching
    dnsPrefetchControl: {
      allow: false,
    },
  },

  // Rate limiting
  rateLimit: {
    max: process.env.RATE_LIMIT_MAX || 100,
    timeWindow: process.env.RATE_LIMIT_WINDOW || "1 minute",
  },
};

module.exports = config;
