import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getDashboardStats, getWeeklyTrends } from '../controllers/stats.controller';
import { apiRateLimiter } from '../middlewares/rateLimiter';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

//JWT Authentication middleware
router.use(authenticationReq);

//Rate limiter
router.use(apiRateLimiter);

//Routes
/**
 * @swagger
 * /stats/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     description: Retrieve comprehensive dashboard statistics including workouts, goals, streaks, and recent activity
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
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
 *                     totalCalories:
 *                       type: number
 *                       example: 5500
 *                     totalDuration:
 *                       type: number
 *                       example: 1200
 *                       description: Total minutes
 *                     activeGoals:
 *                       type: number
 *                       example: 2
 *                     completedGoals:
 *                       type: number
 *                       example: 3
 *                     currentStreak:
 *                       type: number
 *                       example: 5
 *                       description: Current consecutive workout days
 *                     longestStreak:
 *                       type: number
 *                       example: 12
 *                       description: Longest consecutive workout days
 *                     thisWeek:
 *                       type: object
 *                       properties:
 *                         workouts:
 *                           type: number
 *                           example: 3
 *                         calories:
 *                           type: number
 *                           example: 900
 *                         duration:
 *                           type: number
 *                           example: 150
 *                     thisMonth:
 *                       type: object
 *                       properties:
 *                         workouts:
 *                           type: number
 *                           example: 10
 *                         calories:
 *                           type: number
 *                           example: 2500
 *                         duration:
 *                           type: number
 *                           example: 480
 *                     favoriteExerciseType:
 *                       type: string
 *                       example: cardio
 *                       nullable: true
 *                     recentWorkouts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           exerciseName:
 *                             type: string
 *                             example: "Running"
 *                           exerciseType:
 *                             type: string
 *                             example: "cardio"
 *                           duration:
 *                             type: number
 *                             example: 30
 *                           caloriesBurned:
 *                             type: number
 *                             example: 300
 *                           date:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: Unauthorized
 */

//GET /stats/dashboard
router.get('/dashboard', asyncHandler(getDashboardStats));

/**
 * @swagger
 * /stats/weekly-stats:
 *   get:
 *     summary: Get weekly workout stats
 *     description: Retrieve workout statistics grouped by week for trend analysis
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: weeks
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 52
 *           default: 4
 *         description: Number of weeks to retrieve (default 4)
 *     responses:
 *       200:
 *         description: Weekly trends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       week:
 *                         type: string
 *                         example: "2024-W05"
 *                         description: ISO week format (YYYY-W##)
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-29"
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-02-04"
 *                       workouts:
 *                         type: number
 *                         example: 4
 *                         description: Number of workouts in this week
 *                       duration:
 *                         type: number
 *                         example: 180
 *                         description: Total minutes in this week
 *                       calories:
 *                         type: number
 *                         example: 850
 *                         description: Total calories burned in this week
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid weeks parameter
 */

//GET /stats/weekly-stats
router.get('/weekly-stats', asyncHandler(getWeeklyTrends));

export default router;
