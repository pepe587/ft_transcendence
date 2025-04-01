"use strict";

require("dotenv").config();

const config = {
  // Server
  serviceName: (process.env.SERVICE_URL && process.env.SERVICE_URL.split(":")[0]) || "oauth",
  port: (process.env.SERVICE_URL && process.env.SERVICE_URL.split(":")[1]) || 4000,
  host: "0.0.0.0", version: "1.0",

  // Services
  services: {
    gateway: {
      url: process.env.GATEWAY_URL || "http://gateway:3000",
      timeout: 5000,
    },
    stats: {
      url: process.env.STATS_URL || "http://stats:4000",
      timeout: 5000,
    },
  },

  // SQLite
  database: {
    path: "./data/stats.sqlite",
    operationTimeout: 5000,
  },

};

module.exports = config;
