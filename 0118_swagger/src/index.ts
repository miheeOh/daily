import express from 'express';
import swaggerUi from 'swagger-ui-express';  // swagger-ui와 익스프레스를 연결해줌
import swaggerJsDoc from 'swagger-jsdoc';   // swagger-ui를 표현해줌

const app = express();

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
            description:"test 중입니다.",
            url: "http://localhost:3000"
        }]  
    },
    apis: [
        "build/swagger/models.js",
        "build/api/test.js"
    ]
}

const swaggerDoc = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "content-type, x-access-token, access-type, Authorization, authorization"); //1
    next();
});

import test from './api/test'

app.use('/api/test',test)


app.listen(3000,()=>{
    console.log('server start 3000');
    
})