const express = require('express');
const {
  getAllCategory,
  addCategory,
  getCategoryWithProducts,
} = require('../controllers/category');
const router = express.Router();

router.get('/', getAllCategory);
router.get('/:categoryId', getCategoryWithProducts);
router.post('/', addCategory);

module.exports = router;
