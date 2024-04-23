const router = require("express").Router();
const { User, BlogPost } = require("../../models");

// Create a user
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.render("dashboard");
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: "Incorrect username or password." });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "Incorrect username or password." });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            res.render("dashboard");
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/create", async (req, res) => {
    try {
        const blogPostData = await BlogPost.create({
            title: req.body.title,
            comment: req.body.title,
            user_id: req.session.user_id
        });

        const blogPostDataAll = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: {
                model: User,
                attributes: ["username"]
            }
        });

        const blogPosts = blogPostDataAll.map((blogPost) => blogPost.get({ plain: true }));
        res.direct("/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;