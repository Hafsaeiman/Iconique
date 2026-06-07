const User = require("../models/User");

// ── GET /api/wishlist ─────────────────────────────────────────
const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("wishlist");
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    next(error);
  }
};

// ── POST /api/wishlist/toggle ─────────────────────────────────
const toggleWishlist = async (req, res, next) => {
  try {
    const { productId, name, price, image, category, color, badge } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const user = await User.findById(req.user._id);
    const existingIndex = user.wishlist.findIndex((item) => item.productId === productId);

    let action;
    if (existingIndex > -1) {
      // Remove from wishlist
      user.wishlist.splice(existingIndex, 1);
      action = "removed";
    } else {
      // Add to wishlist
      user.wishlist.push({ productId, name, price, image, category, color, badge });
      action = "added";
    }

    await user.save();

    res.status(200).json({
      success: true,
      action,
      message: action === "added" ? "Added to wishlist." : "Removed from wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /api/wishlist/clear ────────────────────────────────
const clearWishlist = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { wishlist: [] });
    res.status(200).json({ success: true, message: "Wishlist cleared.", wishlist: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWishlist, toggleWishlist, clearWishlist };