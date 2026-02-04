import { Router } from 'express';
import { getWorkoutStats } from '../controllers/stats.controller';
import { authenticationReq } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticationReq);

router.get('/workouts/stats', getWorkoutStats);

export default router;
