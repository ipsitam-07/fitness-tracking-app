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

// JWT Auth middleware
router.use(authenticationReq);

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
 *               type:
 *                 type: string
 *               targetValue:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
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
router.post('/', createGoals);

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Get all goals of a logged in user
 *     tags: [Goal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */

//GET /goals
router.get('/', getUserGoals);

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
 *                 type:
 *                   type: string
 *                 targetValue:
 *                   type: number
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Goal not found
 */

//GET /goals/:id
router.get('/:id', getGoalsbyID);

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
 *               endDate:
 *                 type: string
 *                 format: date
 *               targetValue:
 *                 type: number
 *               status:
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
router.patch('/:id', updateGoals);

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
router.delete('/:id', deleteGoals);

export default router;
