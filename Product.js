const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true, // e.g. "p1", "m1", "k1", "h1", "s1", "j1", "b1"
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: ["women", "men", "kids", "shoes", "bags", "jewelry", "home"],
      required: true,
    },
    collection: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    badge: {
      type: String,
      enum: ["Sale", "New", "SALE", "NEW", "BEST SELLER", "BESTSELLER", null],
      default: null,
    },
    color: {
      type: String,
      default: "",
    },
    colors: [String], // For shoes with multiple color swatches
    sizes: [String],
    details: [String],
    shipping: {
      type: String,
      default: "Free shipping on orders over £120",
    },
    returns: {
      type: String,
      default: "Free returns within 30 days",
    },
    image: {
      type: String,
      required: true,
    },
    images: [String],
    hoverImage: {
      type: String,
      default: null,
    },
    gallery: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: null,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 100,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast queries
productSchema.index({ section: 1, category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ badge: 1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;