const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

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

router.get("/create", async (req, res) => {
    res.render("create", {
        loggedIn: req.session.loggedIn,
    });
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/blogpost/:id", async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                }
            ]
        });

        const blogPost = blogPostData.get({ plain: true });

        res.render("blogpost", {
            blogPost,
            user_id: req.session.user_id,
            username: req.session.username,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
})

module.exports = router;