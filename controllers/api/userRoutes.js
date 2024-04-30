const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");

// Create a user
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.status(200).json(dbUserData);
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
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "Successfully logged in." })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/blogpost/:id", async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            comment: req.body.comment,
        });

        req.session.save(() => {
            req.session.user_id = user_id;
            req.session.comment = commentData.comment;
            req.session.loggedIn = true;

            res.status(200).json(commentData);
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/create", async (req, res) => {
    try {
        const blogPostData = await BlogPost.create({
            user_id: req.session.user_id,
            title: req.body.title,
            comment: req.body.comment,
        });

        res.status(200).json(blogPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;