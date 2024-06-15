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
  const product = await prisma.Products.findUnique({
    where: { product_id: productId },
  });

  return product;
};

const findProductByLabel = async (furnitureLabel) => {
  const product = await prisma.products.findUnique({
    where: { product_label: furnitureLabel },
  });

  return product;
};

const updateProductById = async (productId, updateData) => {
  try {
    const updatedProduct = await prisma.products.updateMany({
      where: {
        product_id: productId,
      },
      data: updateData,
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
const deleteProductById = async (productId) => {
  const deletedProduct = await prisma.products.delete({
    where: { product_id: productId },
  });

  return deletedProduct;
};

const findProductsByName = async (productName) => {
  const products = await prisma.Products.findMany({
    where: {
      product_name: {
        contains: productName,
        mode: 'insensitive',
      },
    },
  });
  return products;
};

module.exports = {
  findAllProduct,
  createProduct,
  findProductById,
  findProductByLabel,
  updateProductById,
  deleteProductById,
  findProductsByName,
};
