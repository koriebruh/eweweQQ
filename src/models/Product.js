const prisma = require('../db');

const findAllProduct = async () => {
  const products = await prisma.Products.findMany();

  return products;
};

const createProduct = async (productData) => {
  const product = await prisma.Products.create({ data: productData });

  return product;
};

const findProductById = async (productId) => {
  const product = await prisma.products.findUnique({
    where: { product_id: productId },
  });

  return product;
};

const findProductByLabel = async (productLabel) => {
  const product = await prisma.products.findUnique({
    where: { product_label: productLabel },
  });

  return product;
};

const deleteProductById = async (productId) => {
  const deletedProduct = await prisma.products.delete({
    where: { product_id: productId },
  });

  return deletedProduct;
};

module.exports = {
  findAllProduct,
  createProduct,
  findProductById,
  findProductByLabel,
  deleteProductById,
};
