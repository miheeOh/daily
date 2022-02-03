"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var app = (0, express_1["default"])();
var options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "0.0.1",
            title: "swagger-test"
        },
        servers: [{
                description: "test server",
                url: "http://localhost:3001"
            }]
    },
    apis: [
        "build/swagger/models.js",
        "build/api/user/*.js",
        "build/api/*.js"
    ]
};
var swaggerDoc = (0, swagger_jsdoc_1["default"])(options);
app.use("/api-docs", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerDoc));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "content-type, x-access-token, access-type, Authorization, authorization"); //1
    next();
});
var api_1 = __importDefault(require("./api"));
app.use("/api/v1", api_1["default"]);
app.listen(3001, function () {
    console.log('server start 3001');
});
//# sourceMappingURL=index.js.map