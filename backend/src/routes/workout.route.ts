import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { createWorkout, getUserWorkout } from '../controllers/workout.controller';

const router = Router();

router.use(authenticationReq);

router.post('/workouts', createWorkout);
router.get('/workouts', getUserWorkout);

export default router;
