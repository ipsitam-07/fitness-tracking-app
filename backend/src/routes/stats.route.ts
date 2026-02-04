import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getDashboardStats, getWeeklyTrends } from '../controllers/stats.controller';

const router = Router();

router.use(authenticationReq);

router.get('/dashboard', getDashboardStats);
router.get('/weekly-stats', getWeeklyTrends);

export default router;
