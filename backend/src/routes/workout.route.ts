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
/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Log a workout
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *               durationMinutes:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid workout data
 */
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
