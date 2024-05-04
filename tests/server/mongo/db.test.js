// import { afterAll, afterEach, beforeAll, beforeEach, describe, expect } from 'vitest';
const User = require('../../../server/models/User.js');
const mongoose =  require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


describe('adding a user', () => {
  let user;
  beforeAll( async () => {
    await mongoose.connect(`${process.env.VITE_MONGO_URI}`)
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  beforeEach(() => {
    user = {
      firstName: 'thisisafakefirstname',
      lastName: 'thisisafakelastname',
      email: 'fakeEmail@notReal.com6',
      password: 'fakepassword'
    };
  });

  afterEach( async () => {
    await User.deleteOne({email: 'fakeEmail@notReal.com6'});
  });

  
  it('should create a new user', async () => {
    const newUser = await User.create(user);
    expect(newUser.firstName).toBe(user.firstName);
  });

  it('should not create a user without a password', async () => {
    // user.password = '';
    const newUser = await User.create(user);
    expect(newUser.password).toBe(user.password);
  });

  
});