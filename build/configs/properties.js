"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var properties = {
  DB: {
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST || 'localhost',
    NAME: process.env.DB_NAME || 'dreamy_farm'
  },
  PORT: process.env.RUNNING_PORT || 3001,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret'
};
var _default = properties;
exports["default"] = _default;