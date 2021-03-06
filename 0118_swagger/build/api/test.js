"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController = __importStar(require("./testController"));
const router = (0, express_1.Router)();
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
router.post('/user', testController.userCreate);
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
router.get('/user/:id/find', testController.userFind);
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
router.post('/user/:id/update', testController.userUpdate);
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
router.get('/user/:id/delete', testController.userDelete);
/**
 * @swagger
 * /api/test/body:
 *   post:
 *    summary: body??? ????????????
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
router.post('/body', testController.bodyTest);
exports.default = router;
// parameters ==> ????????? parameter??? ?????????????
// in: path ==> url?????? ????????? ????????? ????????? ?????? ?????? ???????????? ??????
// in: query ==> ???????????? ????????? ????????? ?????? ~???????????? ??????????????? ??????
// required ==> ?????????????????? ????????? ?????? id?????? ????????????
// schema:
//    type: integer   ==> ??????????????? ?????? ??????????????? ????????????  
// reqponse  ==> ????????????
// application/json  ==> ???????????? json??????
// properties  ==> ???????????? ???????????? ?????? ????????? ?????? ??????
