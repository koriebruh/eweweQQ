const response = require('../response');
const { findCategories, createCategory } = require('../models/Category');

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

module.exports = { getAllCategory, addCategory };
