var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('../config/ensureLoggedIn');
var leaderboardCtrl = require("../controllers/leaderboard");

router.get("/", ensureLoggedIn, leaderboardCtrl.show);

module.exports = router;
