const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userprofileController');
router.get(`/codeforces/:username`, userProfileController.codeforcesProfile);
router.get(`/leetcode/:username`, userProfileController.leetcodeProfile);
module.exports = router;