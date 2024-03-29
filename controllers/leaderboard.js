const User = require("../models/user");

module.exports = {
    show
}

async function show(req, res) {
    const users = await User.find({});

    // sort the AI Platforms in ascending order by name
    // users.score.sort((a,b) => {
    //     return (a < b) ? -1 : (a > b) ? 1 : 0;
    // });

    console.log(users)
    res.render("leaderboard", {
        title: "Leaderboard",
        users,
        errorMsg: ""
    });
}
