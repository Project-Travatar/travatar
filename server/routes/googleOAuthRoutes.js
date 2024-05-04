const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { authLogin } = require('../controllers/userController');

const { VITE_GOOGLE_OAUTH_CLIENT_ID, VITE_GOOGLE_OAUTH_CLIENT_SECRET } = process.env;
const callback_url = 'http://localhost:5173/api/auth/google/callback';
const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const oauth2Client = new google.auth.OAuth2(
  VITE_GOOGLE_OAUTH_CLIENT_ID,
  VITE_GOOGLE_OAUTH_CLIENT_SECRET,
  callback_url
);


// router.get('/', (req, res, next) => {console.log('google auth a;lsdkjfroute'); res.status(200).json({ message: 'Google OAuth route'})});

router.get('/', async (req, res, next) => {
  console.log('google auth route');

  const authorizationUrl = await oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: ["https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"],
    include_granted_scopes: true
  });
  
  return res.redirect(authorizationUrl);
  
});

router.get('/callback', async (req, res, next) => {
  // console.log('callback route');
  // console.log('req.params', req.params);
  // console.log('req.query', req.query);

  const { code }  = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  await oauth2Client.setCredentials(tokens);

  const userData = await fetch(GOOGLE_API_URL, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`
    }
  })
  .then(response => response.json())
  
  // console.log(userData);
  res.locals.user = userData;
  // res.location = 'http://localhost:5173';

  next();

}, authLogin);

// router.get('/return', authLogin);

module.exports = router;