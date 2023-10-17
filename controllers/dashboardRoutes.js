const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// uses withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
        // finds logged in user based on the session ID
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['created_at', 'DESC']], // sorts most recent post
        });

        // serialize data for template
        const posts = postData.map((post) => post.get({ plain: true }));
        // pass serialized data and session flag into template
        res.render('dashboard', {
            posts, logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/new", (req, res) => {
    res.render("add-post");
  });
  

module.exports = router;