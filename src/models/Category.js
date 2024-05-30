const prisma = require('../db');

const findCategories = async () => {
  const categories = await prisma.Categories.findMany();

  return categories;
};

const findCategoriesByName = async (categoryName) => {
  const category = await prisma.Categories.findUnique({
    where: { category_name: categoryName },
  });

  return category;
};

const createCategory = async (categoryData) => {
  const category = await prisma.Categories.create({ data: categoryData });

  return category;
};

module.exports = { findCategories, createCategory, findCategoriesByName };
