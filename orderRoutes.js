const express = require("express");
const router = express.Router();
const {
  createOrder,
  trackOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, optionalAuth, adminOnly } = require("../middleware/auth");

// Public tracking (no auth needed — just need order ID)
router.get("/track/:orderId", trackOrder);

// User routes (need login)
router.post("/", optionalAuth, createOrder);      // optionalAuth so guest orders work too
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", optionalAuth, getOrderById);

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;