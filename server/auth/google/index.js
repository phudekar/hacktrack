'use strict';

var express = require('express');
var passport = require('passport');

var auth = require('../auth.service');

var router = express.Router();

var sendAuthenticationRequest = function(req,res,next){
 req.session.redirectUrl = "/";
  if(req.query.success_url){
    req.session.redirectUrl = req.query.success_url ;
 }

 passport.authenticate('google', {
  failureRedirect: '/signup',
  scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
  ],
  session: false
})(req,res,next);
}

var handleCallback = function(req,res,next){
  console.log("Handling callback");
  passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  })(req,res,next);
}

router
.get('/', sendAuthenticationRequest)
.get('/callback', handleCallback, auth.setTokenCookie);

module.exports = router;