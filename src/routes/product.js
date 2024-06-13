const express = require('express');
const {
  getAllProducts,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:productId', getDetailProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
