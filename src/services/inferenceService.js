// const tf = require('@tensorflow/tfjs-node');

// const predictedClassification = async (model, image) => {
//   try {
//     const tensor = tf.node
//       .decodeJpeg(image)
//       .resizeNearestNeighbor([640, 640])
//       .expandDims()
//       .toFloat()
//       .div(tf.scalar(255))
//       .transpose([0, 3, 1, 2]);

//     const prediction = model.predict(tensor);
//     const scores = await prediction.data();
//     console.log(scores);

//     // Find max score and its index
//     let maxScore = -Infinity;
//     let maxScoreIndex = -1;

//     for (let i = 0; i < scores.length; i++) {
//       if (scores[i] > maxScore) {
//         maxScore = scores[i];
//         maxScoreIndex = i;
//       }
//     }
//     console.log(maxScore);
//     console.log(maxScoreIndex);

//     const labels = [
//       'kursi01',
//       'kursi02',
//       'kursi03',
//       'kursi04',
//       'kursi05',
//       'kursi06',
//       'kursi07',
//       'kursi08',
//       'kursi09',
//       'kursi10',
//       'kursi11',
//       'kursi12',
//       'meja01',
//       'sofa01',
//     ];

//     const furnitureType = labels[maxScoreIndex];
//     const furnitureTypes = labels[3];
//     console.log(furnitureType);
//     console.log(furnitureTypes);

//     return { furnitureType };
//   } catch (error) {
//     console.log('error when receive image', error);
//   }
// };

// module.exports = predictedClassification;
