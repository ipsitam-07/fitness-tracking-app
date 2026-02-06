import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getCurrentUser, updateCurrentUser } from '../controllers/user.controller';

const router = Router();
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns the profile of the currently authenticated user based on JWT.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */

router.get('/me', authenticationReq, getCurrentUser);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Updated user profile
 */

router.patch('/me', authenticationReq, updateCurrentUser);

export default router;
