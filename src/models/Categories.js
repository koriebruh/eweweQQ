const prisma = require('../db');

const findCategories = async () => {
  const categories = await prisma.Categories.findMany();

  return categories;
};

module.exports = findCategories;
