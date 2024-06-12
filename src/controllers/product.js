const response = require('../response');
const {
  findAllProduct,
  createProduct,
  findProductById,
  deleteProductById,
} = require('../models/Product');
const { createCategory, findCategoriesByName } = require('../models/Category');

const getAllProducts = async (req, res) => {
  try {
    // show all product
    const products = await findAllProduct();

    response(200, products, 'Success get all products', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when get all products', res);
  }
};

const addProduct = async (req, res) => {
  try {
    // Ambil property yang ada di body buat add product
    const {
      productCategory,
      productName,
      productLabel,
      productImage,
      description,
      color,
      stockQuantity,
      price,
      rating,
      material,
      fabric,
      dimension,
    } = req.body;

    // ambil category yang ada di db
    const category = await findCategoriesByName(productCategory);

    // cek category, kalo ga ada dibikin dulu kalo ada lewat aja
    if (!category) {
      await createCategory(productCategory);
    }

    // prepare data before push db
    const productData = {
      category_id: category.category_id,
      product_name: productName,
      product_label: productLabel,
      product_image: productImage,
      description,
      color,
      stock_quantity: stockQuantity,
      price,
      rating,
      material,
      fabric,
      dimension,
    };

    // push data to db
    await createProduct(productData);

    response(200, productData, 'Success add product', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when add product', res);
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await findProductById(productId);

    if (!product) {
      response(404, `Can't find product`, `Product doesn't exist`, res);
    }

    response(200, product, 'Success get product by Id', res);
  } catch (error) {
    response(500, 'Invalid', 'Error when get detail product', res);
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const deletedProduct = await deleteProductById(productId);

    if (!deletedProduct) {
      response(404, `Can't find product`, `Product doesn't exist`, res);
    }

    response(200, deletedProduct, 'Success delete product by Id', res);
  } catch (error) {
    response(500, 'Invalid', 'Error when delete product', res);
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getDetailProduct,
  deleteProduct,
};
