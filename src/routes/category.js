const express = require('express');
const { getAllCategory, addCategory } = require('../controllers/category');
const router = express.Router();

router.get('/', getAllCategory);
router.post('/', addCategory);

module.exports = router;
