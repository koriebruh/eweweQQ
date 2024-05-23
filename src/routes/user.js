const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  signupUser,
  loginUser,
  logoutUser,
} = require('../controllers/user');

router.get('/', getAllUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
