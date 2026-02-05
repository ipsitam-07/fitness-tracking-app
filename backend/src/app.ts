import express from 'express';
import { swaggerDocs } from './utils/swagger';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.route';
import statsRoutes from './routes/stats.route';
import workoutRoutes from './routes/workout.route';
import goalsRoutes from './routes/goals.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('trust proxy', 1);

//swagger
swaggerDocs(app);

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/stats', statsRoutes);
app.use('/workouts', workoutRoutes);
app.use('/goals', goalsRoutes);

//global error handler
app.use(errorHandler);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
