// const request = require('supertest');
const app = require('../../../../server/app');
const httpMocks = require('node-mocks-http');
const userController = require('../../../../server/controllers/userController');
// const { hasExpectedRequestMetadata } = require('@reduxjs/toolkit/dist/matchers');

describe('loginUser middleware', () => {
  let request;
  let response;

  beforeEach(() => {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users',
      body: {
        email: 'chillkid32@gmail.com',
        password: '12345'
      }
    });
    
    response = httpMocks.createResponse();
    
  });

  it('should find a value user', async () => {
    await userController.loginUser(request, response);
    expect(response.statusCode).toBe(200);
  });

  it('should return a 400 status code if user is not found', async () => {
    request.body.email = 'wrongEmail'
    await userController.loginUser(request, response);
    
  }); 

  it('should return a 400 status code if password is incorrect', async () => {
    request.body.password = 'wrongPassword';
    await userController.loginUser(request, response);
    expect(response.statusCode).toBe(400);
  });

});

// describe('registerUser middleware', () => {

// });