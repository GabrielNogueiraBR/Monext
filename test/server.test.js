/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/server');

const request = supertest(app);

describe('Server', () => {
  afterAll(() => {
    app.close();
  });

  it('Get health endpoint', async () => {
    const res = await request.get('/');

    expect(res.status).toBe(200);
    expect(res.body).toBe('ok');
  });
});
