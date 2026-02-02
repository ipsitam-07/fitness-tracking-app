import express from 'express';
import { swaggerDocs } from './utils/swagger';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

//swagger
swaggerDocs(app);
//global error handler
app.use(errorHandler);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
