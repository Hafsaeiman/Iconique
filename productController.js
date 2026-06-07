const Product = require("../models/Product");

// ── GET /api/products ─────────────────────────────────────────
// Supports: ?section=women&category=Dresses&badge=Sale&sort=price-asc&limit=20&page=1
const getProducts = async (req, res, next) => {
  try {
    const {
      section,
      category,
      collection,
      badge,
      sort = "featured",
      limit = 50,
      page = 1,
      search,
      saleOnly,
    } = req.query;

    const filter = { inStock: true };

    if (section) filter.section = section;
    if (category && category !== "All") {
      const collections = ["New In","Elevated Wardrobe","Summer Whites","Pause","Weekend","Work Wear","Summer","New In","School","Holiday","Sport"];
      if (collections.includes(category)) {
        filter.collection = category;
      } else {
        filter.category = category;
      }
    }
    if (collection) filter.collection = collection;
    if (badge) filter.badge = badge;
    if (saleOnly === "true") filter.badge = { $in: ["Sale", "SALE"] };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { color: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort
    let sortObj = {};
    if (sort === "price-asc") sortObj = { price: 1 };
    else if (sort === "price-desc") sortObj = { price: -1 };
    else if (sort === "rating") sortObj = { rating: -1 };
    else if (sort === "newest") sortObj = { badge: 1, createdAt: -1 };
    else sortObj = { isFeatured: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/products/:id ─────────────────────────────────────
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/products/search?q=silk ──────────────────────────
const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(200).json({ success: true, products: [] });
    }

    const products = await Product.find({
      inStock: true,
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { color: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    }).limit(10);

    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/products/featured ────────────────────────────────
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true, inStock: true }).limit(12);
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// ── POST /api/products (admin) ────────────────────────────────
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ── PUT /api/products/:id (admin) ─────────────────────────────
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { productId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /api/products/:id (admin) ──────────────────────────
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.id });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (error) {
    next(error);
  }
};

// ── POST /api/products/seed (admin/dev) ───────────────────────
const seedProducts = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ success: false, message: "Seeding disabled in production." });
    }

    const { ALL_PRODUCTS } = require("../utils/seedData");
    await Product.deleteMany({});
    const inserted = await Product.insertMany(ALL_PRODUCTS);

    res.status(201).json({
      success: true,
      message: `${inserted.length} products seeded successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
const getProductsBySection = async (req, res, next) => {
  try {
    const products = await Product.find({
      section: req.params.section,
      inStock: true,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getProducts,
  getProductById,
  searchProducts,
  getFeaturedProducts,
  getProductsBySection,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};