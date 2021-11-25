/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/server');

// Supertest to test request to the server.
const request = supertest(app);

describe('Server', () => {
  /**
   * After all tests are finished you need to close the server.
   */
  afterAll(() => {
    app.close();
  });

  /**
   * Checks if the endpoint '/' called "health" is responding as it should,
   * just to see if the server is running.
   */
  it('Get health endpoint', async () => {
    const res = await request.get('/');

    expect(res.status).toBe(200);
    expect(res.body).toBe('ok');
  });
});
