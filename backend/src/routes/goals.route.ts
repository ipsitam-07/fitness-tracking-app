import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import {
  createGoals,
  getUserGoals,
  getGoalsbyID,
  updateGoals,
  deleteGoals,
} from '../controllers/goal.controller';
import { getGoalProgress } from '../controllers/stats.controller';
import { apiRateLimiter } from '../middlewares/rateLimiter';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middlewares/validation.middleware';
import { createGoalSchema, updateGoalSchema } from '../schemas/goal.schema';

const router = Router();

// JWT Auth middleware
router.use(authenticationReq);

//Rate limiters
router.use(apiRateLimiter);

/**
 * @swagger
 * /goals/{id}/progress:
 *   get:
 *     summary: Get goal progress details
 *     description: Retrieve detailed progress information for a specific goal including completion status and projections
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal progress retrieved successfully
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
 *                     goal:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "123e4567-e89b-12d3-a456-426614174000"
 *                         goalType:
 *                           type: string
 *                           enum: [workout_count, weight, calories, duration]
 *                           example: "workout_count"
 *                         targetValue:
 *                           type: number
 *                           example: 20
 *                         currentValue:
 *                           type: number
 *                           example: 8
 *                         startDate:
 *                           type: string
 *                           format: date-time
 *                         endDate:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                           enum: [active, completed, abandoned]
 *                           example: "active"
 *                         description:
 *                           type: string
 *                           example: "Complete 20 workouts this month"
 *                           nullable: true
 *                     progress:
 *                       type: number
 *                       example: 40
 *                       description: Progress percentage (0-100)
 *                     remaining:
 *                       type: number
 *                       example: 12
 *                       description: Units remaining to reach target
 *                     daysLeft:
 *                       type: number
 *                       example: 26
 *                       description: Days until end date
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
 *                     isOnTrack:
 *                       type: boolean
 *                       example: true
 *                       description: Whether user is on pace to complete goal
 *                     dailyTarget:
 *                       type: number
 *                       example: 0.67
 *                       description: Required daily progress to reach target
 *                     projectedCompletion:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: Estimated completion date based on current pace
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Goal belongs to another user
 *       404:
 *         description: Goal not found
 *       400:
 *         description: Invalid goal ID
 */

//GET /goals/:id/progress
router.get('/:id/progress', asyncHandler(getGoalProgress));
/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goal]
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
 *               - targetValue
 *               - startDate
 *               - status
 *             properties:
 *               goalType:
 *                 type: string
 *               targetValue:
 *                 type: number
 *               currentValue:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Invalid goal data
 *       401:
 *         description: Unauthorized
 */

//POST /goals
router.post('/', validate(createGoalSchema), asyncHandler(createGoals));

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Get all goals of a logged in user with pagination and search
 *     tags: [Goal]
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
 *         description: Search by goal type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of goals
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

//GET /goals
router.get('/', asyncHandler(getUserGoals));

/**
 * @swagger
 * /goals/{id}:
 *   get:
 *     summary: Get goal by ID
 *     tags: [Goal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 goalType:
 *                   type: string
 *                 targetValue:
 *                   type: number
 *                 currentValue:
 *                   type: number
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */

//GET /goals/:id
router.get('/:id', asyncHandler(getGoalsbyID));

/**
 * @swagger
 * /goals/{id}:
 *   patch:
 *     summary: Update goal info by ID
 *     tags: [Goal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetValue:
 *                 type: number
 *               currentValue:
 *                 type: number
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Goal info updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */

//PATCH /goals/:id
router.patch('/:id', validate(updateGoalSchema), updateGoals);

/**
 * @swagger
 * /goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goal]
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
 *         description: Goal not found
 */
//DELETE /goals/:id
router.delete('/:id', asyncHandler(deleteGoals));

export default router;
