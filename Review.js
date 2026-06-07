const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    productId: {
      type: String,
      default: null, // Can be null if reviewing general experience
    },
    productName: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Review text is required"],
      minlength: [20, "Review must be at least 20 characters"],
    },
    recommend: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ productId: 1, status: 1 });
reviewSchema.index({ rating: -1 });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;