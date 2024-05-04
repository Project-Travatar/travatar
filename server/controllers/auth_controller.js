const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET)


      // Get user from the token, not including the hashed password
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user);

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ error: 'Not authorized'})

    }
  }
  else {
    res.status(401).json({ error: 'Not authorized, no token'})
  }
}

const verifyCookie = async (req, res, next) => {
  console.log('verifyCookie');
  console.log('req.cookies', req.cookies);
  const token = req.cookies.authToken;
  try{
  const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  console.log('user', user);

  if (!user) {
    return res.status(401).json({ error: 'Not authorized, no user found'})
  } 
  res.locals.user = user;
  next();
  }
  catch (error) {

  }
  // next();

}

module.exports = { protect, verifyCookie }