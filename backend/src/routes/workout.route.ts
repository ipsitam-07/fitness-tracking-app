import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import {
  createWorkout,
  getUserWorkout,
  getWorkoutbyID,
  updateWorkoutbyID,
  deleteWorkoutbyiD,
} from '../controllers/workout.controller';

const router = Router();
//JWT auth middleware
router.use(authenticationReq);

//POST /api/workouts
router.post('/workouts', createWorkout);

//GET /api/workouts
router.get('/workouts', getUserWorkout);

//GET /api/workouts/:id
router.get('/workouts/:id', getWorkoutbyID);

//PATCH /api/workouts/:id
router.patch('/workouts/:id', updateWorkoutbyID);

//DELETE /api/workouts/:id
router.delete('/workouts/:id', deleteWorkoutbyiD);

export default router;
