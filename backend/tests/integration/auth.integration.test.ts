import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/database/models';
import jwt from 'jsonwebtoken';
import { sequelize } from '../../src/database/sequelize';

describe('POST /auth/register (integration)', () => {
  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });
  it('should create user in DB', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'integration@test.com',
      name: 'Integration User',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('integration@test.com');

    const user = await User.findOne({
      where: { email: 'integration@test.com' },
    });

    expect(user).toBeTruthy();
    expect(user?.get('passwordHash')).not.toBe('password123');
  });
});

//Duplicate Register
it('should return 409 if user already exists', async () => {
  const userPayload = {
    email: 'duplicate@test.com',
    name: 'Duplicate User',
    password: 'password123',
  };

  await request(app).post('/auth/register').send(userPayload);

  const res = await request(app).post('/auth/register').send(userPayload);

  expect(res.status).toBe(409);
  expect(res.body.success).toBe(false);
});

//wrong password
it('should return 401 for invalid password', async () => {
  await request(app).post('/auth/register').send({
    email: 'wrongpass@test.com',
    name: 'Wrong Pass',
    password: 'correct123',
  });

  const res = await request(app).post('/auth/login').send({
    email: 'wrongpass@test.com',
    password: 'wrong123',
  });

  expect(res.status).toBe(401);
  expect(res.body.success).toBe(false);
});

//invalid email login
it('should return 401 for non-existing email', async () => {
  const res = await request(app).post('/auth/login').send({
    email: 'doesnotexist@test.com',
    password: 'any123',
  });

  expect(res.status).toBe(401);
  expect(res.body.success).toBe(false);
});

//valid jwt with user id
it('should return valid JWT token', async () => {
  const registerRes = await request(app).post('/auth/register').send({
    email: 'jwt@test.com',
    name: 'JWT User',
    password: 'password123',
  });

  const loginRes = await request(app).post('/auth/login').send({
    email: 'jwt@test.com',
    password: 'password123',
  });

  const token = loginRes.body.data.accessToken;

  expect(token).toBeDefined();
  const decoded: any = jwt.verify(token, process.env.JWT_TOKEN!);

  expect(decoded.userId).toBeDefined();
});

//Protected route testing
it('should allow access with valid token', async () => {
  // Register + login
  await request(app).post('/auth/register').send({
    email: 'protected@test.com',
    name: 'Protected',
    password: 'password123',
  });

  const loginRes = await request(app).post('/auth/login').send({
    email: 'protected@test.com',
    password: 'password123',
  });

  const token = loginRes.body.data.accessToken;

  const res = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
});

//Rate limiting test
it('should block after too many login attempts', async () => {
  const payload = {
    email: 'ratelimit@test.com',
    password: 'wrongpass',
  };

  // Make multiple requests
  for (let i = 0; i < 6; i++) {
    await request(app).post('/auth/login').send(payload);
  }

  const res = await request(app).post('/auth/login').send(payload);

  expect(res.status).toBe(429);
});
