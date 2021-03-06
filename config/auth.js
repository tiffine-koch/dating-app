'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var authMiddleware = function(req, res, next) {

  try {
    var payload = jwt.decode(req.cookies.mytoken, JWT_SECRET);
  } catch(err) {
    // return res.status(401).send('Authentication failed.');
    // return res.status(401).render('noauth');
  }

  req.user = payload;

  console.log('req.user in config is', req.user);
  next();
};

module.exports = authMiddleware;
