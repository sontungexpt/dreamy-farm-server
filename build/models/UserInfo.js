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
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255
  },
  fullName: {
    type: String,
    "default": ''
  },
  addreses: {
    type: Array,
    validate: {
      validator: function validator(array) {
        return array.every(function (v) {
          var addressValidated = typeof v.address === 'string';
          var phoneNumberValidated = /\d{3}-\d{3}-\d{4}/.test(v.phoneNumber) || v.phoneNumber === '';
          var addressActiveValidated = typeof v.addressActive === 'number';
          return addressValidated && phoneNumberValidated && addressActiveValidated;
        });
      },
      message: function message(props) {
        return "".concat(props.array, " is not a valid address");
      }
    },
    "default": []
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