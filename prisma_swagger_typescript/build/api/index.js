"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_1 = __importDefault(require("./user"));
var router = (0, express_1.Router)();
router.use('/user', user_1["default"]);
// /api/v1/user
exports["default"] = router;
//# sourceMappingURL=index.js.map