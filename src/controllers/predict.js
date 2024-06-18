const { findProductByLabel } = require('../models/Product');
const response = require('../response');
const predictedClassification = require('../services/inferenceService');
const loadModel = require('../services/loadModel');

let model;

(async () => {
  try {
    model = await loadModel();
  } catch (error) {
    console.error('Failed to load model on startup:', error);
    process.exit(1);
  }
})();

const postPredictionData = async (req, res) => {
  const image = req.file.buffer;

  try {
    if (!model) {
      return response(500, null, 'Model is not loaded yet', res);
    }

    const { furnitureLabel, maxScore } = await predictedClassification(
      model,
      image
    );

    if (maxScore <= 0.9) {
      return response(404, null, 'Sorry, product not found', res);
    }

    const product = await findProductByLabel(furnitureLabel);

    if (!product) {
      response(404, `Can't find product`, `Product doesn't exist`, res);
    }

    response(200, [product], 'Success get predicted product', res);
  } catch (error) {
    console.error('Error during prediction:', error);
    response(500, null, 'Error when prediction', res);
  }
};

module.exports = { postPredictionData };
