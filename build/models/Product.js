"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var slug = require('mongoose-slug-updater');
_mongoose["default"].plugin(slug);
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var Product = new Schema({
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
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  }
}, {
  timestamps: true
});
Product.index({
  slug: 1
});
var _default = _mongoose["default"].model('Product', Product);
exports["default"] = _default;