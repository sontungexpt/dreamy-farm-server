"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var UserInfo = new Schema({
  // Authentication
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255
  },
  roles: [{
    type: ObjectId,
    ref: 'Role',
    "default": ['user']
  }],
  // Additional information
  fullName: {
    type: String,
    "default": ''
  },
  addreses: [{
    type: String,
    "default": ''
  }],
  addressActive: {
    type: Number,
    "default": 0
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function validator(value) {
        return /\d{3}-\d{3}-\d{4}/.test(value) || value === '';
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid phone number!");
      }
    }
  },
  avatar: {
    type: String,
    "default": ''
  },
  favoriteProducts: [{
    type: ObjectId,
    ref: 'Product'
  }]
});
UserInfo.index({
  email: 1
});
var _default = _mongoose["default"].model('UserInfo', UserInfo);
exports["default"] = _default;