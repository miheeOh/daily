import {Router} from 'express';
import user from './user'

const router = Router()

router.use('/user',user)
// /api/v1/user

export default router