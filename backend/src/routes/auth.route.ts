import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { authRateLimiter } from '../middlewares/rateLimiter';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

//Rate limiter
router.use(authRateLimiter);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Not found
 */
router.post('/register', asyncHandler(registerUser));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *
 */
router.post('/login', asyncHandler(loginUser));

export default router;
