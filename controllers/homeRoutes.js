const router = require("express").Router();
const { BlogPost } = require("../models");

// home should display blogposts
// successful login will redirect to dashboard
// clicking on blogpost should allow user to comment on blogpost
// dashboard should be able to let you view, create, update, delete post
// blogpost should be added to homepage

router.get("/", async (req, res,) => {
    try {
        res.render("homepage", {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render()
})

module.exports = router;