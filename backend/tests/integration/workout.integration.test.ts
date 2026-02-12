import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/database/sequelize';
import { Workout } from '../../src/database/models';
import { registerAndLogin } from '../helper';

describe('Workouts Routes - Integration Tests', () => {
  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  // CREATE WORKOUT

  it('should create workout successfully', async () => {
    const token = await registerAndLogin();

    const res = await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'cardio',
      exerciseName: 'Running',
      duration: 30,
      caloriesBurned: 250,
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.exerciseName).toBe('Running');

    const workout = await Workout.findOne({
      where: { exerciseName: 'Running' },
    });

    expect(workout).toBeTruthy();
  });

  it('should return 401 if no token provided', async () => {
    const res = await request(app).post('/workouts').send({
      exerciseType: 'cardio',
      exerciseName: 'Running',
      duration: 30,
      caloriesBurned: 250,
    });

    expect(res.status).toBe(401);
  });

  // GET ALL WORKOUTS

  it('should fetch user workouts', async () => {
    const token = await registerAndLogin();

    await request(app).post('/workouts').set('Authorization', `Bearer ${token}`).send({
      exerciseType: 'cardio',
      exerciseName: 'Cycling',
      duration: 40,
      caloriesBurned: 300,
    });

    const res = await request(app).get('/workouts').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  // GET SINGLE WORKOUT

  it('should fetch workout by id', async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post('/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exerciseType: 'strength',
        exerciseName: 'Squats',
        duration: 20,
        caloriesBurned: 150,
      });

    const workoutId = createRes.body.data.id;

    const res = await request(app)
      .get(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(workoutId);
  });

  // UPDATE WORKOUT

  it('should update workout successfully', async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post('/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exerciseType: 'other',
        exerciseName: 'Walking',
        duration: 15,
        caloriesBurned: 100,
      });

    const workoutId = createRes.body.data.id;

    const res = await request(app)
      .patch(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ duration: 25 });

    expect(res.status).toBe(200);
    expect(res.body.data.duration).toBe(25);
  });

  // DELETE WORKOUT

  it('should delete workout successfully', async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post('/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        exerciseType: 'cardio',
        exerciseName: 'Jogging',
        duration: 30,
        caloriesBurned: 200,
      });

    const workoutId = createRes.body.data.id;

    const res = await request(app)
      .delete(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  // 403 ACCESS CONTROL

  it('should return 403 if accessing another user workout', async () => {
    const token1 = await registerAndLogin();
    const token2 = await registerAndLogin();

    const createRes = await request(app)
      .post('/workouts')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        exerciseType: 'cardio',
        exerciseName: 'Owner Workout',
        duration: 30,
        caloriesBurned: 200,
      });

    const workoutId = createRes.body.data.id;

    const res = await request(app)
      .get(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token2}`);

    expect(res.status).toBe(403);
  });
});
