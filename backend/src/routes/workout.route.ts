import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { createWorkout } from '../controllers/workout.controller';

const router = Router();

router.use(authenticationReq);

router.post('/workouts', createWorkout);

export default router;
