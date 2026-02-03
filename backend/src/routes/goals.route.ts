import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import {
  createGoals,
  getUserGoals,
  getGoalsbyID,
  updateGoals,
  deleteGoals,
} from '../controllers/gaol.controller';

const router = Router();

//JWT Auth middleware
router.use(authenticationReq);

//Routes

//POST /goals
router.post('/goals', createGoals);

//GET /goals
router.get('/goals', getUserGoals);

//GET /goals/:id
router.get('/goals/:id', getGoalsbyID);

//PATCH /goals/:id
router.patch('/goals/:id', updateGoals);

//DELETE /goals/:id
router.delete('/goals/:id', deleteGoals);
export default router;
