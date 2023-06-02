"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _SiteController = _interopRequireDefault(require("../controllers/SiteController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var siteController = new _SiteController["default"]();
router.use('/', siteController.index);
router.use('/products/search', siteController.search);
var _default = router;
exports["default"] = _default;