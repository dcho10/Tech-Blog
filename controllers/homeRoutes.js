const router = require("express").Router();
const { User, BlogPost } = require("../models");

// home should display blogposts
// successful login will redirect to dashboard
// clicking on blogpost should allow user to comment on blogpost
// dashboard should be able to let you view, create, update, delete post
// blogpost should be added to homepage

router.get("/", async (req, res,) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: {
                model: User,
                attributes: ["username"]
            }
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render("homepage", {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/home", async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: {
                model: User,
                attributes: ["username"]
            }
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render("homepage", {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/dashboard", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect("/login");
        }
        const userId = req.session.user_id;
        const blogPosts = await BlogPost.findAll({
            where: { user_id: userId },
            include: User
        });
        res.render("dashboard", { blogPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/create", async (req, res) => {
    res.render("create");
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
})

module.exports = router;