# daily

## 0118 
### swagger 이용
#### swagger? API 관리 도구

// 어떠한 방식으로 데이터를 요청받은 지에 대한 명세
개발자가 rest api 명세를 쉽게 문서화할 수 있도록 도와주는 도구.
swagger-ui : restapi를 html로 구현하여 보여줌.

참고블로그 : https://any-ting.tistory.com/105
참고블로그 : https://blog.logrocket.com/documenting-your-express-api-with-swagger/

## 0119
### $ref: 
swagger 폴더의 models폴더에 사전에 정의한 내용을 참조하여 사용.
// ref 관련 참고 : https://swagger.io/docs/specification/using-ref/
// components 관련 추후 참고 : https://swagger.io/docs/specification/components/

### swagger-ui body값 받아오기
참고사이트 : https://swagger.io/docs/specification/describing-request-body/


## 0120 
### swagger와 prisma 함께 사용 with typescript
npm init -y
npm install prisma typescript ts-node @types/node --save-dev  // 지금 설치하는 것은 개발시에만 사용하믈 --save-dev 옵션주고 설치
npx prisma init  // prisma 사용을 위한 폴더트리 생성
.env 파일 수정
DATABASE_URL="mysql://root:@localhost:3306/0120_prisma"
// 나는 mysql을 사용하고 database의 이름은 0120_prisma를 사용
prisam폴더의 schema.prisma 파일 안의 내용 수정
// datasource db안의 provider = "postgresql"을 provider="mysql" 로 변경
#### tsconfig.json 파일 생성
예시
/*
{
    "compilerOptions": {
      "sourceMap": true,
      "rootDir": "src",
      "outDir": "build",
      "strict": true,
      "lib": ["esnext"],
      "esModuleInterop": true
    },
    "include":[
        "src/**/*.ts"
    ],
    "exclude":[
        "node_modules"
    ]
  }
*/
#### package.json 파일의 script 내용 추가
/*
    "migrate:first": "npx prisma migrate dev --name practice",
    "push": "npx prisma db push",
    "start": "tsc",
    "dev": "nodemon build/index.js"
*/
#### 테이블 생성
prisma 폴더의 schema.prisma 파일에 테이블 짜는 코드 추가 후 
npm run migrate:first  // 이는 package.json에서 script에 추가한 내용에 의한 것
#### prisma 사용시
npx install @prisma/client
/*
ex)
const {PrismaClient} = require('@prisma/client');
const { user } = new PrismaClient()
*/

src 폴더 생성
src 폴더 내에 api / swagger 폴더 추가
// api 폴더에는 실제 router 를 연결하고 api를 명세하는 공간
// swagger 폴더는 api 작성시 자주 사용될만한 내용들을 미리 생성하여 $ref: 를 이용하여 쉽게 참조할 수 있도록, 즉 참조한 내용을 작성하는 공간
src 폴더 내에 index.ts / prisma.ts 파일 추가


#### index.ts 파일 작성
/*
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
*/
// 코드에 따라 필요한 모듈 추가 설치
// 도뮬 설치했는데도 빨간 줄 뜨는 경우
    npm i --save-dev @types/express 이와 같이 type이 적용된것도 추가 설치해주어야 함
    빨간줄 나타난 곳에 마우스 대면 내용 알 수 있음.

    test
