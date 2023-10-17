const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // gets all posts and JOIN with user data
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
        res.render('homepage', {
            posts, logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets a single post from homepage
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
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
        });

        const posts = postData.get({ plain: true });

        res.render('post', {
            ...posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    // if user is already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;