import {Router} from 'express'
import * as userController from './user.controller'

const router = Router();
/**
 * @swagger
 * /api/v1/user/join:
 *  get:
 *    summary: user join
 *    tags: [user]
 *    responses:
 *      200:
 *       description: success
 *      400:
 *       not found '/join'
 */
router.get('/join',userController.userJoin)

/**
 * @swagger
 * /api/v1/user/join:
 *  post:
 *    summary: create user
 *    tags: [user]
 *    consumes:
 *      - application/json
 *    requestBody:
 *      content:
 *         application/json:
 *          schema:
 *            $ref: '#/definitions/userCreate'
 *    responses:
 *          200:
 *           description: user created
 *           content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/definitions/userInfo'
 *          400:
 *           description: fail ...
 */
router.post('/join',userController.userCreate)

/**
 * @swagger
 * /api/v1/user/login
 *  post:
 *   summary: user login
 *   tags: [user]
 *   consumes:
 *     - application/json
 *   requestBody:
 *     content:
 *       application/json
 *          
 */
router.post('/login',userController.login);

/**
 * @swagger
 * 
 */
router.get('/info/:id/main',userController.myPage)

/**
 * @swagger
 */
router.post('/info/:id/add',userController.insertUserInfo)



export default router;