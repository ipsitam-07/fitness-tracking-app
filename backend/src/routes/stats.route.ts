import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getDashboardStats, getWeeklyTrends } from '../controllers/stats.controller';
import { apiRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

//JWT Authentication middleware
router.use(authenticationReq);

//Rate limiter
router.use(apiRateLimiter);

//Routes
router.get('/dashboard', getDashboardStats);
router.get('/weekly-stats', getWeeklyTrends);

export default router;
