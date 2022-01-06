const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create(
        {
            body: req.body.comment_text,
            title: req.body.title,
            user_id: req.body.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;