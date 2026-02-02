import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getCurrentUser } from '../controllers/user.controller';

const router = Router();

router.get('/me', authenticationReq, getCurrentUser);

export default router;
