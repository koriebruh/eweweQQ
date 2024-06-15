const response = require('../response');
const {
  findCategories,
  createCategory,
  findCategoryWithProducts,
} = require('../models/Category');

const getAllCategory = async (req, res) => {
  try {
    const categories = await findCategories();

    response(200, categories, 'Success get all categories', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error', res);
  }
};

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const newCategory = {
      category_name,
    };

    await createCategory(newCategory);

    response(201, newCategory, 'Success add category', res);
  } catch (error) {
    console.log(error.message);
    response(500, 'invalid', 'error when add category', res);
  }
};

const getCategoryWithProducts = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);

    const categoryProduct = await findCategoryWithProducts(categoryId);

    if (!categoryProduct) {
      return response(404, null, 'Category not found', res);
    }

    response(200, categoryProduct, 'Success get category with products', res);
  } catch (error) {
    console.log(error.message);
    response(500, 'invalid', 'error', res);
  }
};

module.exports = { getAllCategory, addCategory, getCategoryWithProducts };
