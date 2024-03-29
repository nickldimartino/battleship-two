var express = require('express');
var router = express.Router();
const passport = require('passport');
var ensureLoggedIn = require('../config/ensureLoggedIn');
const User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Battleship 2' });
});

router.get('/game', ensureLoggedIn, async function(req, res, next) {
  const user = await User.findById(req.user._id);
  user.gamesPlayed++;
  // await user.save()
  
  res.render('game', { 
    title: 'Battleship 2',
    user,
    errorMsg: ""
  });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
