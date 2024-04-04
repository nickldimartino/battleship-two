/*---------- Modules ----------*/
const User = require("../models/user");


/*---------- Module Exports ----------*/
module.exports = {
    show,
    update
}


/*---------- Functions ----------*/
// display the leaderboard page with all users
async function show(req, res) {
    const users = await User.find({});

    // sort the user scores in ascending order by name
    users.sort((a,b) => {
        return (a.score > b.score) ? -1 : (a.score < b.score) ? 1 : 0;
    });

    // console.log(users)
    res.render("leaderboard", {
        title: "Leaderboard",
        users,
        errorMsg: ""
    });
}

// update the current users data
async function update(req, res) {
    // get the current user
    const user = await User.findById(req.user._id);

    // update the user info
    user.score = req.body.score;
    user.wins = req.body.wins;
    user.losses = req.body.losses;
    user.gamesPlayed = req.body.gamesPlayed;

    // save the user info
    await user.save()
}
