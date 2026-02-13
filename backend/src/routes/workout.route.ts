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
import { apiRateLimiter } from '../middlewares/rateLimiter';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validation.middleware';
import { createWorkoutSchema, updateWorkoutSchema } from '../schemas/workout.schema';

const router = Router();
//JWT auth middleware
router.use(authenticationReq);

//Rate limiter
router.use(apiRateLimiter);
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
 *               - exerciseType
 *               - exerciseName
 *               - duration
 *               - caloriesBurned
 *               - date
 *             properties:
 *               exerciseType:
 *                 type: string
 *               exerciseName:
 *                 type: string
 *               duration:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid workout data
 */
//POST /workouts
router.post('/', validate(createWorkoutSchema), asyncHandler(createWorkout));

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts of a logged in user with pagination and search
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by workout name or type
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by exact workout type
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */

//GET /workouts
router.get('/', asyncHandler(getUserWorkout));

/**
 * @swagger
 * /workouts/stats:
 *   get:
 *     summary: Get workout statistics
 *     description: Retrieve aggregated statistics for user's workouts with optional date filtering
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Workout statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalWorkouts:
 *                       type: number
 *                       example: 25
 *                     totalDuration:
 *                       type: number
 *                       example: 1200
 *                       description: Total minutes
 *                     totalCalories:
 *                       type: number
 *                       example: 5500
 *                     averageDuration:
 *                       type: number
 *                       example: 48
 *                     averageCalories:
 *                       type: number
 *                       example: 220
 *                     workoutsByType:
 *                       type: object
 *                       properties:
 *                         cardio:
 *                           type: number
 *                           example: 10
 *                         strength:
 *                           type: number
 *                           example: 8
 *                         flexibility:
 *                           type: number
 *                           example: 5
 *                         sports:
 *                           type: number
 *                           example: 2
 *                         other:
 *                           type: number
 *                           example: 0
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid parameters
 */

//GET /workouts/stats
router.get('/stats', asyncHandler(getWorkoutStats));
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
 *                 exerciseType:
 *                   type: string
 *                 exerciseName:
 *                   type: string
 *                 duration:
 *                   type: number
 *                 caloriesBurned:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 *                 notes:
 *                   type: string
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 */
//GET /workouts/:id
router.get('/:id', asyncHandler(getWorkoutbyID));

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
 *               exerciseType:
 *                 type: string
 *               exerciseName:
 *                 type: string
 *               duration:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
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
router.patch('/:id', validate(updateWorkoutSchema), asyncHandler(updateWorkoutbyID));

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
router.delete('/:id', asyncHandler(deleteWorkoutbyiD));

export default router;
