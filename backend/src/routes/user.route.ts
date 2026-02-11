import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getCurrentUser, updateCurrentUser } from '../controllers/user.controller';
import { asyncHandler } from '../utils/asyncHandler';

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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     weight:
 *                       type: number
 *                       nullable: true
 *                     height:
 *                       type: number
 *                       nullable: true
 *                     gender:
 *                       type: string
 *                       nullable: true
 *                     age:
 *                       type: number
 *                       nullable: true
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/me', authenticationReq, asyncHandler(getCurrentUser));

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Update current authenticated user
 *     description: Updates profile information for the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch('/me', authenticationReq, asyncHandler(updateCurrentUser));

export default router;
