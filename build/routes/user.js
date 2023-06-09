"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
var _UserMiddlewares = require("../middlewares/UserMiddlewares");
var _useMiddlewares = _interopRequireDefault(require("../utils/useMiddlewares"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var userController = new _UserController["default"]();
var middlewares = {
  '/userInfos': [_UserMiddlewares.checkUserInfo],
  '/feedback': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo],
  '/getOrders': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo],
  '/updateProfile': [_UserMiddlewares.checkIsUser, _UserMiddlewares.checkUserInfo]
};
(0, _useMiddlewares["default"])(router, middlewares);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/login', userController.login);
router.post('/userInfos', userController.getUserInfos);
router.post('/feedback', userController.feedback);
router.put('/updateProfile', userController.updateProfile);
var _default = router;
exports["default"] = _default;