import {Router} from 'express'
import * as testController from './testController'

const router = Router();




/**
 * @swagger
 * /api/test/user:
 *   post:
 *    summary: create user
 *    tags: [user]
 *    consumes:
 *      - application/json
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/createUser'
 *    responses:
 *          200:
 *           description: success user create
 *          400:
 *           description: fail user create
 * 
 */
 router.post('/user',testController.userCreate);

 /**
 * @swagger
 * /api/test/user/{id}/find:
 *   get:
 *    summary: find user by id
 *    tags: [user]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        requires: true
 *        description: find user by Id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *       description: success
 *       content:
 *          application/json:
 *             schema:
 *               $ref: '#/definitions/findUser'
 *      400:
 *       description: fail
 * 
 */
 router.get('/user/:id/find',testController.userFind);

 /**
 * @swagger
 * /api/test/user/{id}/update:
 *   post:
 *    summary: update user info by id
 *    tags: [user]
 *    consumes:
 *      - application/json
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/createUser'
 *    parameters:
 *      - name: id
 *        in: path
 *        requires: true
 *        description: unique userid
 *        schema:
 *          type: integer
 *    responses:
 *     200:
 *      description: success update
 *      content:
 *         application/json:
 *             schema:
 *                $ref: '#/definitions/findUser'
 *     400:
 *      description: fail update
 * 
 * 
 */
 router.post('/user/:id/update',testController.userUpdate);

 /**
 * @swagger
 * /api/test/user/{id}/delete:
 *   get:
 *    summary: delete user by id
 *    tags: [user]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        requires: true
 *        description: delete user by Id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *       description: success 
 *      400:
 *       description: fail
 * 
 */
 router.get('/user/:id/delete',testController.userDelete)


 /**
  * @swagger
  * /api/test/body:
  *   post:
  *    summary: body값 가져오기 
  *    tags: [body]
  *    consumes:
  *      - application/json
  *    requestBody:
  *       content:
  *         application/json:
  *             schema: 
  *               type: object
  *               properties:
  *                    testvalue:
  *                       type: string
  *                       example: teststring
  * 
  * 
  * 
  */
 router.post('/body',testController.bodyTest)

export default router
// parameters ==> 어떠한 parameter를 보내는가?
// in: path ==> url안에 변수로 설정한 부분에 해당 값이 포함될때 사용
// in: query ==> 파마리터 형태로 어떠한 값은 ~하다라고 명시해줄때 사용
// required ==> 클라이언트가 반드시 해당 id값을 보내야함
// schema:
//    type: integer   ==> 정수형태로 해당 파라미터를 넘기도록  

// reqponse  ==> 응답관련
// application/json  ==> 반환값은 json형태
// properties  ==> 말그래도 반환되는 값의 속성에 대한 정보