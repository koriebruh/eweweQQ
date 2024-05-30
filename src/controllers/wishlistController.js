const Wishlist = require('../models/wishlistModel');

exports.getAllWishlists = (req, res) => {
  const wishlists = Wishlist.findAll();
  res.json(wishlists);
};

exports.getWishlistById = (req, res) => {
  const wishlist = Wishlist.findById(req.params.id);
  if (!wishlist) return res.status(404).send('Wishlist not found');
  res.json(wishlist);
};

exports.createWishlist = (req, res) => {
  const { users_id, product_id } = req.body;
  if (!users_id || !product_id) return res.status(400).send('users_id and product_id are required');
  
  const newWishlist = Wishlist.create(users_id, product_id);
  res.status(201).json(newWishlist);
};

exports.updateWishlist = (req, res) => {
  const wishlist = Wishlist.update(req.params.id, req.body);
  if (!wishlist) return res.status(404).send('Wishlist not found');
  res.json(wishlist);
};

exports.deleteWishlist = (req, res) => {
  const success = Wishlist.delete(req.params.id);
  if (!success) return res.status(404).send('Wishlist not found');
  res.status(204).send();
};
