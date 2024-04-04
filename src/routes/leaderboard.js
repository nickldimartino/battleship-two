/*---------- Modules ----------*/
const express = require('express');
const router = express.Router();
const leaderboardCtrl = require("../controllers/leaderboard");


/*---------- Routes ----------*/
router.get("/", leaderboardCtrl.show);
router.post("/update", leaderboardCtrl.update);


/*---------- Router Export ----------*/
module.exports = router;
