"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); // swagger-ui와 익스프레스를 연결해줌
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); // swagger-ui를 표현해줌
const app = (0, express_1.default)();
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "0.0.1",
            title: 'swagger-test',
            description: "swagger test",
            // 접근하는 경로에 대한 정보
        },
        servers: [{
                description: "test 중입니다.",
                url: "http://localhost:3000"
            }]
    },
    apis: [
        "build/swagger/models.js",
        "build/api/test.js"
    ]
};
const swaggerDoc = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "content-type, x-access-token, access-type, Authorization, authorization"); //1
    next();
});
const test_1 = __importDefault(require("./api/test"));
app.use('/api/test', test_1.default);
app.listen(3000, () => {
    console.log('server start 3000');
});
