const request = require('supertest');
const app = require('../../../../server/app');

describe('app is running', () => {
  const response = request(app).get('/supertest/test');
});
