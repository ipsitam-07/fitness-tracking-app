import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import {
  createWorkout,
  getUserWorkout,
  getWorkoutbyID,
  updateWorkoutbyID,
  deleteWorkoutbyiD,
} from '../controllers/workout.controller';
import { getWorkoutStats } from '../controllers/stats.controller';

const router = Router();
//JWT auth middleware
router.use(authenticationReq);
/**
 * @swagger
 * /workouts:
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
//POST /workouts
router.post('/', createWorkout);

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts of a logged in user
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized
 */

//GET /workouts
router.get('/', getUserWorkout);
router.get('/stats', getWorkoutStats);
/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by ID
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 type:
 *                   type: string
 *                 durationMinutes:
 *                   type: number
 *                 caloriesBurned:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 */
//GET /workouts/:id
router.get('/:id', getWorkoutbyID);

/**
 * @swagger
 * /workouts/{id}:
 *   patch:
 *     summary: Update workout info by ID
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                   type: string
 *               durationMinutes:
 *                   type: number
 *               caloriesBurned:
 *                   type: number
 *               date:
 *                   type: string
 *                   format: date
 *     responses:
 *       200:
 *         description: Workout info updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */

//PATCH /workouts/:id
router.patch('/:id', updateWorkoutbyID);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
//DELETE /workouts/:id
router.delete('/:id', deleteWorkoutbyiD);

export default router;
