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
      return res.status(500).send('Model is not loaded yet');
    }

    const { score } = await predictedClassification(model, image);
    console.log(score);

    response(200, score, 'berhasil', res);
  } catch (error) {
    console.error('Error during prediction:', error);
    response(500, null, 'Error when prediction');
  }
};

module.exports = { postPredictionData };
