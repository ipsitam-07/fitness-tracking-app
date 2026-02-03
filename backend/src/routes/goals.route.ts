import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { createGoals } from '../controllers/gaol.controller';

const router = Router();

//JWT Auth middleware
router.use(authenticationReq);

//Routes

//POST /goals
router.post('/goals', createGoals);

export default router;
