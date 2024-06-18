const tf = require('@tensorflow/tfjs-node');

const predictedClassification = async (model, image) => {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
      .div(tf.scalar(255));

    const prediction = model.predict(tensor);
    const scores = await prediction.data();

    // Find max score and its index
    let maxScore = -Infinity;
    let maxScoreIndex = 0;

    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        maxScoreIndex = i;
      }
    }

    const labels = [
      'kursi01',
      'kursi02',
      'kursi03',
      'kursi04',
      'kursi05',
      'kursi06',
      'kursi07',
      'kursi08',
      'kursi09',
      'kursi10',
      'kursi11',
      'kursi12',
      'meja01',
      'sofa01',
    ];

    const furnitureLabel = labels[maxScoreIndex];

    return { furnitureLabel, maxScore };
  } catch (error) {
    console.log('error when receive image', error);
  }
};

module.exports = predictedClassification;
