const express = require('express');
const router = express.Router();
const {
  addWishlist,
  getAllWishlist,
  // updatedWishlistItem,
  deletedWishlistItem,
  getAllUserWishlist,
} = require('../controllers/wishlist');

router.get('/', getAllWishlist);
router.post('/', addWishlist);
router.get('/:userId', getAllUserWishlist);
// router.put('/:wishlistId', updatedWishlistItem);
router.delete('/:wishlistId', deletedWishlistItem);

module.exports = router;
