import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/database/sequelize';
import { Goal } from '../../src/database/models';
import { GoalStatus, GoalType } from '../../src/enums/goals';
import { registerAndLogin } from '../helper';

describe('Stats Routes - Integration Tests', () => {
  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  // WORKOUT STATS

  it('should return workout stats', async () => {
    const token = await registerAndLogin();

    await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'cardio',
      exerciseName: 'Run',
      duration: 30,
      caloriesBurned: 200,
    });

    const res = await request(app).get('/workouts/stats').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalWorkouts).toBe(1);
    expect(res.body.data.totalCalories).toBe(200);
  });

  it('should return 401 if no token for workout stats', async () => {
    const res = await request(app).get('/workouts/stats');
    expect(res.status).toBe(401);
  });

  // DASHBOARD STATS

  it('should return dashboard stats', async () => {
    const token = await registerAndLogin();

    await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'cardio',
      exerciseName: 'Cycle',
      duration: 40,
      caloriesBurned: 300,
    });

    const res = await request(app).get('/stats/dashboard').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.result.totalWorkouts).toBe(1);
    expect(res.body.data.result.totalCalories).toBe(300);
  });

  // WEEKLY TRENDS

  it('should return weekly trends', async () => {
    const token = await registerAndLogin();

    await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'strength',
      exerciseName: 'Squats',
      duration: 20,
      caloriesBurned: 150,
    });

    const res = await request(app)
      .get('/stats/weekly-stats')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  // DAILY WORKOUTS

  it('should return daily workouts for current week', async () => {
    const token = await registerAndLogin();

    await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'cardio',
      exerciseName: 'Jogging',
      duration: 25,
      caloriesBurned: 180,
    });

    const res = await request(app)
      .get('/stats/daily-workouts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.dailyCounts).toBeDefined();
  });

  // GOAL PROGRESS

  it('should return goal progress', async () => {
    const token = await registerAndLogin();

    const userRes = await request(app)
      .post('/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exerciseType: 'cardio',
        exerciseName: 'Run',
        duration: 30,
        caloriesBurned: 200,
      });

    const goal = await Goal.create({
      userId: userRes.body.data.userId ?? undefined,
      goalType: GoalType.CALORIES,
      targetValue: 500,
      currentValue: 200,
      startingValue: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 86400000),
      status: GoalStatus.ACTIVE,
      description: 'Burn 500 calories',
    });

    const res = await request(app)
      .get(`/goals/${goal.id}/progress`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.progress).toBeDefined();
  });

  it('should return 403 when accessing another user goal', async () => {
    const token1 = await registerAndLogin();
    const token2 = await registerAndLogin();

    const user1Profile = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token1}`);

    const ownerId = user1Profile.body.data.id;
    const goal = await Goal.create({
      userId: ownerId,
      goalType: GoalType.CALORIES,
      targetValue: 500,
      currentValue: 200,
      startingValue: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 86400000),
      status: GoalStatus.ACTIVE,
      description: 'Burn 500 calories',
    });

    const res = await request(app)
      .get(`/goals/${goal.id}/progress`)
      .set('Authorization', `Bearer ${token2}`);

    expect(res.status).toBe(403);
  });
});
