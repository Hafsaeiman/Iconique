const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.use(protect);

// Get Cart
router.get("/", getCart);

// Add Item
router.post("/", addToCart);

// Update Quantity
router.put("/:itemId", updateCartItem);

// Remove Item
router.delete("/:itemId", removeCartItem);

// Clear Cart
router.delete("/", clearCart);

module.exports = router;