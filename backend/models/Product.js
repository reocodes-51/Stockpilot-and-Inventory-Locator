const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 0
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    shelf: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "General"
    },

    company: {
      type: String,
      default: "Unknown"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);