const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models")
const withAuth = require("../utils/auth");



module.exports = router;