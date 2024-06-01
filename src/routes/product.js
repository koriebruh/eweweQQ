const express = require('express');
const {
  getAllProducts,
  addProduct,
  getDetailProduct,
} = require('../controllers/product');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:productId', getDetailProduct);

module.exports = router;
