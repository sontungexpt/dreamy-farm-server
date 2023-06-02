"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var User = new Schema({
  email: {
    type: String,
    "default": ''
  },
  password: {
    type: String,
    "default": ''
  },
  status: {
    type: String,
    "default": 'active'
  },
  deletedAt: {
    type: Date,
    "default": null
  }
}, {
  timestamps: true
});

// login.index({ first: 1, last: -1 }) Nơi đánh index
var _default = _mongoose["default"].model('User', User);
exports["default"] = _default;