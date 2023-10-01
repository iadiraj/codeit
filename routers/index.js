const express = require('express');
const validate = require('../middlewares/authenticate');
const router = express.Router();
router.use(`/profile`, require('./profile'));
router.use(`/contest`,validate , require('./contest'));
router.use(`/user`, require('./users'));
module.exports = router;