import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const app = express();

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info: {
            version: "0.0.1",
            title: "swagger-test"
        },
        servers: [{
            description:"test server",
            url:"http://localhost:3001",
        }]
    },
    apis: [
        "build/swagger/models.js",
        "build/api/user/*.js",
        "build/api/*.js"
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
})

import user from "./api"
app.use("/api/v1",user)


app.listen(3001,()=>{
    console.log('server start 3001');
    
})