const tf = require('@tensorflow/tfjs-node');

const predictedClassification = async (model, image) => {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([640, 640])
      .expandDims()
      .toFloat()
      .div(tf.scalar(255))
      .transpose([0, 3, 1, 2]);

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    // const maxScoreIndex = scores.indexOf(Math.max(...scores));

    return { score };
  } catch (error) {
    console.log('error when receive image', error);
  }
};

module.exports = predictedClassification;
