const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

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
        res.status(500).json(err);
    }
})

router.get("/dashboard", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    try {
        const blogPostData = await BlogPost.findAll({
            include: {
                model: User,
                where: {
                    id: req.session.user_id
                },
                attributes: ["username"]
            }
        });
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        res.render("dashboard", {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/create", async (req, res) => {
    res.render("create", {
        loggedIn: req.session.loggedIn,
    });
})

router.get("/edit/:id", (req, res) => {
    res.render("edit", {
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