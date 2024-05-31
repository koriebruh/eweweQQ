const response = require('../response');
const { findWishlist, createWishlist, updateWishlist, deleteWishlist } = require('../models/Wishlist');

const getAllWishlist = async (req, res) => {
  try {
    const wishlistItems = await findWishlist();
    response(200, wishlistItems, 'Success get all wishlist items', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when get all wishlist items', res);
  }
};


const addWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const wishlistData = {
      user_id,
      product_id,
    };
    const wishlistItem = await createWishlist(wishlistData);

    response(200, wishlistItem, 'Success add wishlist item', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when add wishlist item', res);
  }
};


const updatedWishlistItem = async (req, res) => {
  try {
    const wishlistId = parseInt(req.params.wishlistId);
    const updateData = req.body;

    const updatedWishlistItem = await updateWishlist(wishlistId, updateData);

    response(200, updatedWishlistItem, 'Success update wishlist item', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when update wishlist item', res);
  }
};

const deletedWishlistItem = async (req, res) => {
  try {
    const wishlistId = parseInt(req.params.wishlistId);

    const deletedWishlistItem = await deleteWishlist(wishlistId);

    response(200, deletedWishlistItem, 'Success delete wishlist item', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when delete wishlist item', res);
  }
};


module.exports = {
  getAllWishlist,
  addWishlist,
  updatedWishlistItem,
  deletedWishlistItem,
};
