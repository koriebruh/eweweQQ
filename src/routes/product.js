const express = require('express');
const {
  getAllProducts,
  addProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
} = require('../controllers/product');
const { postPredictionData } = require('../controllers/predict');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get('/', getAllProducts);
router.post('/', addProduct);
router.post('/predict', upload.single('image'), postPredictionData);
router.get('/search', searchProducts);
router.get('/:productId', getDetailProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);



module.exports = router;
