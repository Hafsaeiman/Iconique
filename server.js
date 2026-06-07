
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error");

// ── Import Routes ──────────────────────────────────────────────
const authRoutes      = require("./routes/authRoutes");
const productRoutes   = require("./routes/productRoutes");
const orderRoutes     = require("./routes/orderRoutes");
const reviewRoutes    = require("./routes/reviewRoutes");
const contactRoutes   = require("./routes/contactRoutes");
const wishlistRoutes  = require("./routes/wishlistRoutes");

const app = express();

// ── Connect to MongoDB ─────────────────────────────────────────
connectDB();

// ── Security Middleware ────────────────────────────────────────
app.use(helmet());

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api/", limiter);

// Stricter limit on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many login attempts. Please try again in 15 minutes." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", authLimiter);

// ── CORS ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body Parsers ──────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Logger (dev only) ─────────────────────────────────────────
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ── Health Check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🛍 Iconique API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth:      "/api/auth",
      products:  "/api/products",
      orders:    "/api/orders",
      reviews:   "/api/reviews",
      contact:   "/api/misc/contact",
      newsletter:"/api/misc/newsletter",
      wishlist:  "/api/wishlist",
    },
  });
});

// ── API Routes ────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",   orderRoutes);
app.use("/api/reviews",  reviewRoutes);
app.use("/api/misc",     contactRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ── 404 & Error Handlers ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Iconique Server running on port ${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV}`);
  console.log(`   URL         : http://localhost:${PORT}`);
  console.log(`   API Base    : http://localhost:${PORT}/api\n`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});