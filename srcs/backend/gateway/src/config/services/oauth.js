"use strict";

module.exports = {
  name: "oauth",
  url: process.env.AUTH_SERVICE_URL || "http://oauth:4000",
  prefix: "/oauth",
  routes: {

    // Third-party Authentication
    "/google": {
      // Initiates Google authentication flow
      method: ["GET"],
      path: "/google",
      rateLimit: { max: 5, timeWindow: 60 }
    },
    "/callback": {
      // Callback to process Google response
      method: ["GET"],
      path: "/callback",
      rateLimit: { max: 5, timeWindow: 60 }
    },
    "/42": {
      // Initiates 42 authentication flow
      method: ["GET"],
      path: "/42",
      rateLimit: { max: 5, timeWindow: 60 }
    },
    "/42/callback": {
      // Callback to process 42 response
      method: ["GET"],
      path: "/42/callback",
      rateLimit: { max: 5, timeWindow: 60 }
    },
  
    "/login": {
      // Returns current user information
      method: ["POST"],
      path: "/test",
      rateLimit: { max: 30, timeWindow: 10 }
    },

    // Service Routes
    "/health": {
      // Health check endpoint for the service
      method: ["GET"],
      path: "/health",
      rateLimit: { max: 20, timeWindow: 10 }
    },
  },
  timeout: 5000,
};