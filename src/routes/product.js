const express = require('express');
const {
  getAllProducts,
  addProduct,
  getDetailProduct,
  deleteProduct,
} = require('../controllers/product');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:productId', getDetailProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
