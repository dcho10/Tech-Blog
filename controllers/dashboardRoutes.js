const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models")
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
    res.render("dashboard", {
        loggedIn: req.session.loggedIn, 
    });
})

module.exports = router;