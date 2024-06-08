const express = require('express');
const multer = require('multer');
const { postPredictionData } = require('../controllers/predict');

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage to keep file in memory
const upload = multer({
  storage: storage,
});

router.post('/', upload.single('image'), postPredictionData);

module.exports = router;
