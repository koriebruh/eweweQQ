let wishlists = [];
let currentId = 1;

class Wishlist {
  constructor(users_id, product_id) {
    this.wishlist_id = currentId++;
    this.users_id = users_id;
    this.product_id = product_id;
  }

  static findAll() {
    return wishlists;
  }

  static findById(id) {
    return wishlists.find(w => w.wishlist_id === parseInt(id));
  }

  static create(users_id, product_id) {
    const newWishlist = new Wishlist(users_id, product_id);
    wishlists.push(newWishlist);
    return newWishlist;
  }

  static update(id, updatedData) {
    const wishlist = Wishlist.findById(id);
    if (wishlist) {
      wishlist.users_id = updatedData.users_id || wishlist.users_id;
      wishlist.product_id = updatedData.product_id || wishlist.product_id;
    }
    return wishlist;
  }

  static delete(id) {
    const index = wishlists.findIndex(w => w.wishlist_id === parseInt(id));
    if (index !== -1) {
      wishlists.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Wishlist;
