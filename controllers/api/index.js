const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/', userRoutes);
router.use('/', postRoutes);
router.use('/api', commentRoutes);

module.exports = router;