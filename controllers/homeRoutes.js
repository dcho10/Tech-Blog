const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

// This router will send the user to the homepage, find all the blogpost data, display all the blogposts that various users have created, and the loggedIn value will be true
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

// Has exact same functionality of router.get("/"), have a home button and logo redirects to homepage to make it more user friendly
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

// If the user is not logged in, user is redirected to the login page, once user has logged in, it will find all the blogposts that only the user has created, and renders it on their dashboard for them to view, edit, or delete
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

// Directs user to page to create a blogpost
router.get("/create", async (req, res) => {
    res.render("create", {
        loggedIn: req.session.loggedIn,
    });
})

// Directs user to the page where they can edit their post, added the id to the route in order to see the exact post being edited as part of the put functionality
router.get("/edit/:id", (req, res) => {
    res.render("edit", {
        loggedIn: req.session.loggedIn,
    });
})

// Directs user to the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
})

// Directs user to the a singular blogpost based on the what the user has selected on the page, the user will be able to see the post, any comments users have posted on it, and the exact user who made the comment
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

// Directs user to log in page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
})

module.exports = router;