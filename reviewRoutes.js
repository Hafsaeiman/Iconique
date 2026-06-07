const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, optionalAuth, adminOnly } = require("../middleware/auth");

router.get("/", getReviews);                                              // Public
router.post("/", optionalAuth, createReview);                            // Guest or user
router.get("/all", protect, adminOnly, getAllReviews);                   // Admin
router.put("/:id/status", protect, adminOnly, updateReviewStatus);      // Admin
router.delete("/:id", protect, adminOnly, deleteReview);                // Admin

module.exports = router;