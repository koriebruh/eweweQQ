const express = require('express');
const router = express.Router();
const { addWishlist, getAllWishlist, updatedWishlistItem, deletedWishlistItem, getDetailWishlist } = require('../controllers/wishlist');

router.get('/', getAllWishlist);
router.post('/', addWishlist);
router.get('/:wishlistId', getDetailWishlist);
router.put('/:wishlistId', updatedWishlistItem);
router.delete('/:wishlistId', deletedWishlistItem);

module.exports = router;