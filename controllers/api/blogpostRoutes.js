const router = require("express").Router();
const { BlogPost, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/blogpost/:id", async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            blogpost_id: req.body.blogPostId,
            user_id: req.session.user_id
        });

        res.status(200).json(commentData)

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/create", async (req, res) => {
    try {
        const blogPostData = await BlogPost.create({
            user_id: req.session.user_id,
            title: req.body.title,
            post: req.body.post,
        });

        res.status(200).json(blogPostData);
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;