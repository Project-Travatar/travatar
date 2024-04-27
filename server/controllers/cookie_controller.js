// const { Cookie } = require("express-session");

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('userId', req.header.authorization);
  return next();
}

cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('authToken');
  console.log('cookie deleted'); 
  return next();
};

module.exports = cookieController;