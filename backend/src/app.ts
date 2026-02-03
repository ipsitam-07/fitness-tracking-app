import express from 'express';
import { swaggerDocs } from './utils/swagger';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.route';
import workoutRoutes from './routes/workout.route';
import goalsRoutes from './routes/goals.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//swagger
swaggerDocs(app);

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/', workoutRoutes);
app.use('/', goalsRoutes);

//global error handler
app.use(errorHandler);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
