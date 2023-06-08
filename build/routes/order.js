"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));
var _UserMiddlewares = require("../middlewares/UserMiddlewares");
var _useMiddlewares = _interopRequireDefault(require("../utils/useMiddlewares"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var orderController = new _OrderController["default"]();
var middlewares = {
  '/getOrders': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo]
};
(0, _useMiddlewares["default"])(router, middlewares);
router.get('/getOrders', orderController.getOrders);
var _default = router;
exports["default"] = _default;