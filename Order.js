const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
  image: { type: String },
  selectedSize: { type: String },
  color: { type: String },
  section: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Allow guest orders
    },
    // Customer info
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    // Delivery address
    deliveryAddress: {
      address: { type: String, required: true },
      address2: { type: String, default: "" },
      city: { type: String, required: true },
      postcode: { type: String, required: true },
      country: { type: String, required: true, default: "Pakistan" },
    },
    // Items ordered
    items: [orderItemSchema],
    // Pricing
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    // Delivery
    deliveryMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },
    estimatedDelivery: { type: String },
    // Payment
    paymentMethod: {
      type: String,
      enum: ["card", "cod", "easypaisa"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    // Order status / tracking
    status: {
      type: String,
      enum: [
        "placed",
        "payment_confirmed",
        "processing",
        "dispatched",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "placed",
    },
    // Tracking timeline
    timeline: [
      {
        label: String,
        date: String,
        done: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
      },
    ],
    courier: { type: String, default: null },
    trackingNumber: { type: String, default: null },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Generate human-readable Order ID before save
orderSchema.pre("validate", function (next) {
  if (!this.orderId) {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 8999);
    this.orderId = `IC-${year}-${rand}`;
  }
  next();
});

// Build default timeline when order is created
orderSchema.pre("save", function (next) {
  if (this.isNew && (!this.timeline || this.timeline.length === 0)) {
    const now = new Date();
    const fmt = (d) =>
      d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });

    const deliveryDate = new Date(now);
    deliveryDate.setDate(deliveryDate.getDate() + (this.deliveryMethod === "express" ? 2 : 5));

    this.timeline = [
      { label: "Order Placed", date: fmt(now), done: true },
      {
        label: "Payment Confirmed",
        date:
          this.paymentMethod === "cod"
            ? "On delivery"
            : fmt(now),
        done: this.paymentMethod !== "cod",
      },
      { label: "Processing & Packing", date: "In progress", done: true, active: true },
      { label: "Dispatched", date: "Estimated tomorrow", done: false },
      { label: "Out for Delivery", date: `In ${this.deliveryMethod === "express" ? "1–2" : "3–4"} days`, done: false },
      {
        label: "Delivered",
        date: deliveryDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        done: false,
      },
    ];

    this.estimatedDelivery = deliveryDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  next();
});

// orderSchema.index({ orderId: 1 });
orderSchema.index({ "customer.email": 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;