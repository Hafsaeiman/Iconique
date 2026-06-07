const Review = require("../models/Review");
const Product = require("../models/Product");

// ── POST /api/reviews ─────────────────────────────────────────
const createReview = async (req, res, next) => {
  try {
    const { name, email, productId, productName, category, rating, title, body, recommend } = req.body;

    if (!name || !email || !rating || !title || !body || recommend === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, email, rating, title, review body, and recommend are all required.",
      });
    }

    if (body.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Review must be at least 20 characters.",
      });
    }

    const reviewData = {
      name,
      email,
      productId: productId || null,
      productName: productName || "",
      category: category || "",
      rating,
      title,
      body,
      recommend,
      status: "pending",
    };

    // Link to user if logged in
    if (req.user) {
      reviewData.user = req.user._id;
      // Check if verified purchase
      // (Could query orders here — simplified for now)
    }

    const review = await Review.create(reviewData);

    // Update product avg rating if productId given
    if (productId) {
      const allReviews = await Review.find({ productId, status: "approved" });
      if (allReviews.length > 0) {
        const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await Product.findOneAndUpdate(
          { productId },
          { rating: Math.round(avg * 10) / 10, reviews: allReviews.length }
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Review submitted! It will be visible after moderation (within 24 hours).",
      review: {
        id: review._id,
        name: review.name,
        rating: review.rating,
        title: review.title,
        status: review.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/reviews?productId=p1 ─────────────────────────────
const getReviews = async (req, res, next) => {
  try {
    const { productId, page = 1, limit = 10 } = req.query;
    const filter = { status: "approved" };
    if (productId) filter.productId = productId;

    const skip = (Number(page) - 1) * Number(limit);
    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Review.countDocuments(filter),
    ]);

    // Compute summary stats
    const allRatings = await Review.find(filter).select("rating recommend");
    const avgRating =
      allRatings.length > 0
        ? Math.round((allRatings.reduce((s, r) => s + r.rating, 0) / allRatings.length) * 10) / 10
        : 0;
    const recommendPct =
      allRatings.length > 0
        ? Math.round((allRatings.filter((r) => r.recommend).length / allRatings.length) * 100)
        : 0;

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      avgRating,
      recommendPct,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/reviews/all (admin) ──────────────────────────────
const getAllReviews = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, total, reviews });
  } catch (error) {
    next(error);
  }
};

// ── PUT /api/reviews/:id/status (admin) ───────────────────────
const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    // Recalculate product rating if approved/rejected
    if (review.productId) {
      const allReviews = await Review.find({ productId: review.productId, status: "approved" });
      if (allReviews.length > 0) {
        const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await Product.findOneAndUpdate(
          { productId: review.productId },
          { rating: Math.round(avg * 10) / 10, reviews: allReviews.length }
        );
      }
    }

    res.status(200).json({ success: true, message: `Review ${status}.`, review });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /api/reviews/:id (admin) ───────────────────────────
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }
    res.status(200).json({ success: true, message: "Review deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = { createReview, getReviews, getAllReviews, updateReviewStatus, deleteReview };