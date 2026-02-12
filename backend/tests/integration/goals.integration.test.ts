import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/database/sequelize';
import { Goal } from '../../src/database/models';
import { registerAndLogin } from '../helper';

describe('Goals Routes - Integration Tests', () => {
  let token: string;
  let goalId: string;

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  // CREATE GOAL

  it('should create goal successfully', async () => {
    token = await registerAndLogin();

    const res = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 2000,
        currentValue: 0,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    const goal = await Goal.findOne();
    expect(goal).toBeTruthy();
  });

  it('should return 401 if no token provided', async () => {
    const res = await request(app)
      .post('/goals')
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 2000,
      });

    expect(res.status).toBe(401);
  });

  it('should return 400 for invalid targetValue', async () => {
    token = await registerAndLogin();

    const res = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 0,
      });

    expect(res.status).toBe(400);
  });

  // GET GOALS

  it('should fetch user goals', async () => {
    token = await registerAndLogin();

    await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 1000,
        currentValue: 0,
      });

    const res = await request(app).get('/goals').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  // GET SINGLE GOAL

  it('should fetch specific goal by id', async () => {
    token = await registerAndLogin();

    const createRes = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 1000,
        currentValue: 0,
      });

    goalId = createRes.body.data.id;

    const res = await request(app).get(`/goals/${goalId}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(goalId);
  });

  // UPDATE GOAL

  it('should update goal successfully', async () => {
    token = await registerAndLogin();

    const createRes = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 1000,
        currentValue: 0,
      });

    goalId = createRes.body.data.id;

    const res = await request(app)
      .patch(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentValue: 500,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.currentValue).toBe(500);
  });

  // DELETE GOAL

  it('should delete goal successfully', async () => {
    token = await registerAndLogin();

    const createRes = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 1000,
        currentValue: 0,
      });

    goalId = createRes.body.data.id;

    const res = await request(app)
      .delete(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  // FORBIDDEN ACCESS

  it('should return 403 if accessing another user goal', async () => {
    // User A
    const tokenA = await registerAndLogin();

    const createRes = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({
        goalType: 'calories',
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        targetValue: 1000,
        currentValue: 0,
      });

    const goalId = createRes.body.data.id;

    // User B
    await request(app).post('/auth/register').send({
      email: 'second@test.com',
      name: 'Second User',
      password: 'password123',
    });

    const loginB = await request(app).post('/auth/login').send({
      email: 'second@test.com',
      password: 'password123',
    });

    const tokenB = loginB.body.data.accessToken;

    const res = await request(app).get(`/goals/${goalId}`).set('Authorization', `Bearer ${tokenB}`);

    expect(res.status).toBe(403);
  });
});
