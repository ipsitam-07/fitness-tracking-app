import { Router } from 'express';
import { authenticationReq } from '../middlewares/auth.middleware';
import { getDashboardStats } from '../controllers/stats.controller';

const router = Router();

router.use(authenticationReq);

router.get('/stats/dashboard', getDashboardStats);

export default router;
