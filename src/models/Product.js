const prisma = require('../db');

const findAllProduct = async () => {
  const products = await prisma.Products.findMany();

  return products;
};

const createProduct = async (productData) => {
  const product = await prisma.Products.create({ data: productData });

  return product;
};

module.exports = { findAllProduct, createProduct };
