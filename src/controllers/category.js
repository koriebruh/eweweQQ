const response = require('../response');
const findCategories = require('../models/Categories');

const getAllCategory = async (req, res) => {
  try {
    const categories = await findCategories();

    response(200, categories, 'Success get all categories', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error', res);
  }
};

module.exports = getAllCategory;
