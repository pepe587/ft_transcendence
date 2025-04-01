"use strict";

module.exports = {
  name: "stats",
  url: process.env.STATS_SERVICE_URL || "http://stats:4000",
  prefix: "/stats",
  routes: {

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