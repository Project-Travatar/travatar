const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  console.log('request to register user', req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    // check that all fields have been provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: 'Please add all required fields' })
      return;
    }

    // check if user already exists
    const userExists = await User.findOne({email});

    // console.log(userExists);
    if (userExists) {
      res.status(400).json({ error: 'User already exists'});
      return;
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({firstName, lastName, email, password: hashedPassword});

    if (user) {
      res.status(201).json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: generateToken(user._id) })
    } else {
      res.status(400).json({ error: 'Invalid user data'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

const loginUser = async (req, res) => {
  console.log('request to login user', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // For testing the catch block for the loginUser controller
    // throw new Error('Intentional error for testing');

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  try {
    res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
  
};

const authLogin = async (req, res) => {
  console.log('request to login user');
  const { email, id, given_name, family_name } = res.locals.user;
  console.log('email', email);
  try {
    const user = await User.findOne({ email });
    console.log('user', user);

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(id, salt);
      const newUser = await User.create({firstName: given_name, lastName: family_name, email: email, password: hashedPassword});
      console.log('newUser', newUser);
      res.cookie('authToken', generateToken(newUser._id), { httpOnly: true });
      return res.redirect('http://localhost:5173');
    }else {
      console.log('this user exists');
      // const exisitingUser = await user.findOne({ email });
      // console.log('existing user', exisitingUser);
      res.cookie('authToken', generateToken(user._id), { httpOnly: true });
      return res.redirect('http://localhost:5173');
    }
  }
  catch(err){

  }
}


// generate json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.VITE_JWT_SECRET, {expiresIn: '30d'})
}

module.exports = { registerUser, loginUser, getUser, authLogin };