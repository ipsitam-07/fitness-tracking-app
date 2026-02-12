import request from 'supertest';
import app from '../src/app';
export async function registerAndLogin() {
  const email = `goaluser${Date.now()}@test.com`;

  await request(app).post('/auth/register').send({
    email,
    name: 'Goal User',
    password: 'password123',
  });

  const loginRes = await request(app).post('/auth/login').send({
    email,
    password: 'password123',
  });

  expect(loginRes.status).toBe(200);

  return loginRes.body.data.accessToken;
}
