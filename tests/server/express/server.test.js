const request = require('supertest');
const app = require('../../../server/app');

describe('app is running', () => {

  it('should give a response', async () => {
    const response = await request(app).get('/supertest/test');
    expect(response.statusCode).toBe(404);
  })
});

describe('this is a test', ()=>{
  it('should pass', ()=>{
    expect(true).toBe(true)
  })
});