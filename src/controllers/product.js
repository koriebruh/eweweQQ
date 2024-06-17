const response = require('../response');
const {
  findAllProduct,
  createProduct,
  findProductById,
  deleteProductById,
  updateProductById,
  findProductsByName,
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
      // await createCategory(productCategory);
      await createCategory({ category_name: productCategory });
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

    response(200, [product], 'Success get product by Id', res);
  } catch (error) {
    response(500, 'Invalid', 'Error when get detail product', res);
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const {
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

    const updateData = {
      product_name: productName,
      product_label: productLabel,
      product_image: productImage,
      description: description,
      color: color,
      stock_quantity: stockQuantity,
      price: price,
      rating: rating,
      material: material,
      fabric: fabric,
      dimension: dimension,
    };

    const updatedProduct = await updateProductById(productId, updateData);

    if (!updatedProduct) {
      return response(404, `Can't find product`, `Product doesn't exist`, res);
    }

    response(200, updateData, 'Success update product', res);
  } catch (error) {
    console.error('Error updating product:', error);
    response(500, 'Invalid', 'Error when updating product', res);
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

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const products = await findProductsByName(query);
    if (products.length === 0) {
      return res.status(404).json({ message: `Product with name ${query} not found` });
    }

    return res.status(200).json({ data: products, message: 'Success search products' });
  } catch (error) {
    res.status(500).json({ message: 'Error when search products' });
    console.error(error);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
