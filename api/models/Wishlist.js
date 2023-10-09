const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        img: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
        },
        inStock: {
          type: Boolean,
          default: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);