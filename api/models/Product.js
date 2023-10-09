const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    shortDesc: { type: String, required: true },
    mainImg: { type: String },
    img: { type: Array },
    categories: { type: String },
    size: { type: String },
    material: { type: String },
    color: { type: Array },
    colorimg: { type: Array },
    price: { type: Number, required: true },
    onSale: { type: Boolean, default: "false" },
    discountPrice: { type: Number },
    rating: { type: Number, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
