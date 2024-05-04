const request = require('supertest');
const app = require('../../../../server/app');
const User = require('../../../../server/models/User');
const jwt = require('jsonwebtoken');
// const { it } = require('vitest');
// const { expect } = require('vitest');

describe('itineraryRoutes', () => {

  describe('GET /api/trip/retrieve', () => {

    it('should send 401 if no token', async () => {
    const response = await request(app)
    .get('/api/trip/retrieve');
    expect(response.statusCode).toBe(401);
    // console.log('request.body', response.body);
    expect(response.body.error).toBe('Not authorized, no token');
    });

    it('should send 401 if token is invalid', async () => {
      const response = await request(app)
      .get('/api/trip/retrieve')
      .set('authorization', 'Bearer ');
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Not authorized');
    });

    it('should send 200 if token is valid', async () => {
      const Tom = await User.findOne({ email: 'chillkid32@gmail.com' });
      const TomToken = jwt.sign({ id: Tom._id }, process.env.VITE_JWT_SECRET, { expiresIn: '30d' });
      const response = await request(app)
      .get('/api/trip/retrieve')
      .set('authorization', 'Bearer ' + TomToken);
      // console.log('response.body', response.body);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    }); 
  });

  // describe('POST /api/trip/create')
});
