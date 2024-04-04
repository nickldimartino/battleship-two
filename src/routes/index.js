/*---------- Modules ----------*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// User model
const User = require("../models/user");


/*---------- Routes ----------*/
// GET route to home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Battleship 2' });
});

// GET route to the game page
router.get('/game', ensureLoggedIn, async function(req, res, next) {
  // get the current user
  const user = await User.findById(req.user._id);
  
  // render the game with the user
  res.render('game', { 
    title: 'Battleship 2',
    user,
    errorMsg: ""
  });
});

// GET route to Google OAuth login
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

// GET route Google OAuth callback
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// GET route to OAuth logout
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});


/*---------- Router Export ----------*/
module.exports = router;
