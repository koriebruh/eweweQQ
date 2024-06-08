const prisma = require('../db');

async function storeData(id, data) {
  try {
    await prisma.prediction.upsert({
      where: { id: id },
      update: { data: data },
      create: { id: id, data: data }
    });
  } catch (err) {
    console.error('Error storing data:', err);
  }
}

module.exports = storeData;