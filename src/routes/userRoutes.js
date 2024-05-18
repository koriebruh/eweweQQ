const express = require('express');
const router = express.Router();

const { getAllUsers, signupUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/signup', signupUser);

module.exports = router;
