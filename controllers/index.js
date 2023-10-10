const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);


module.exports = router;