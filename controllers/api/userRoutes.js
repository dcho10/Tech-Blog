const router = require("express").Router();
const { User } = require("../../models");

// This router allows the user to create an account using the POST method, user must provide a username, email, and password in order to create an account, once all the information has been logged, it will be saved in the session
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

// This router allows the user to login using the POST method, once the user provides their username, it will search the database to find the userwith that username, if the username or password is wrong, it will generate the error message. If the user successfully logs in, the session will save the user ID, their username, and get redirected to their dashboard
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
            res.redirect("/dashboard");
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// This router allows the user to logout using the POST method
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