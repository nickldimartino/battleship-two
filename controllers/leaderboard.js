const User = require("../models/user");

module.exports = {
    show
}

async function show(req, res) {
    const users = await User.find({});
    console.log(users)
    res.render("leaderboard", {
        title: "Leaderboard",
        users,
        errorMsg: ""
    });
}
