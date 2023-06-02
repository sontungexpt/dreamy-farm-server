"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var Order = new Schema({
  user: {
    type: ObjectId,
    ref: 'UserInfo'
  },
  status: {
    type: String,
    "default": 'pending'
  },
  // info of order
  paymentMethod: {
    type: String,
    "default": 'cash'
  },
  paymentStatus: {
    type: String,
    "default": 'pending'
  },
  products: [{
    type: ObjectId,
    ref: 'Product'
  }],
  price: {
    type: Number,
    "default": 0
  },
  address: {
    type: String,
    "default": ''
  },
  phoneNumber: {
    type: String,
    "default": ''
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Order', Order);
exports["default"] = _default;