const tflite = require('tflite-node');
const fs = require('fs');
const path = require('path');

async function loadModel() {
  const modelBuffer = fs.readFileSync(path.resolve(__dirname, process.env.MODEL_URL));
  return new tflite.Interpreter(modelBuffer);
}

module.exports = loadModel;