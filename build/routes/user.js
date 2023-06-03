"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var userController = new _UserController["default"]();
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.post('/login', userController.login);
router.post('/userInfos', userController.getUserInfos);

// router.post('/updateUserInfo', userController.updateUserInfo);

router.post('/updateFavoriteProducts', userController.updateFavoriteProducts);
router.post('/getFavoriteProducts', userController.getFavoriteProducts);
var _default = router;
exports["default"] = _default;