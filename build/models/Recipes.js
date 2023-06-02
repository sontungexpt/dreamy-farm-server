"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var Recipes = new Schema({
  order: {
    type: ObjectId,
    ref: 'Order',
    "default": null
  },
  name: {
    type: String,
    "default": ''
  },
  image: {
    type: String,
    "default": ''
  },
  category: {
    type: String,
    "default": ''
  },
  type: {
    type: Array,
    "default": [{
      name: '',
      price: 0
    }]
  },
  description: {
    type: String,
    "default": ''
  },
  sold: {
    type: Number,
    "default": 0
  },
  status: {
    type: String,
    "default": 'active'
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Recipes', Recipes);
exports["default"] = _default;