const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts,
  getFeaturedProducts,
  getProductsBySection,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/auth");

// Public
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/featured", getFeaturedProducts);
router.get("/section/:section", getProductsBySection);
router.get("/:id", getProductById);
// Admin only
router.post("/", protect, adminOnly, createProduct);
router.post("/seed", seedProducts); // Dev: no auth guard (gated by NODE_ENV inside controller)
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;