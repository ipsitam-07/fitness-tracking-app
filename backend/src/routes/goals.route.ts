import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { createGoals, getUserGoals } from '../controllers/gaol.controller';

const router = Router();

//JWT Auth middleware
router.use(authenticationReq);

//Routes

//POST /goals
router.post('/goals', createGoals);

//GET /goals
router.get('/goals', getUserGoals);
export default router;
