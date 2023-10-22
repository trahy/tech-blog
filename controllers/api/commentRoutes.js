const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// gets all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        if (!commentData) {
            return res.status(404).json({ message: "No comment found" });
        };
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a single comment
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        if (!commentData) {
            return res.status(404).json({ message: 'No comment found with that ID' });
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// post a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deletes a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({ _id: req.params.thoughtId });

        if (!commentData) {
            return res.status(404).json({ message: 'No comment found with that ID' });
        }

        res.status(200).json({ commentData, message: 'Comment successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;