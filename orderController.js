const Order = require("../models/Order");

// ── POST /api/orders ──────────────────────────────────────────
const createOrder = async (req, res, next) => {
  try {
    // FIX: frontend sends nested { customer: {}, deliveryAddress: {} }
    // so destructure accordingly instead of flat fields
    const {
      customer,
      deliveryAddress,
      items,
      subtotal,
      shippingCost,
      total,
      deliveryMethod,
      paymentMethod,
    } = req.body;

    const {
      firstName,
      lastName,
      email,
      phone,
    } = customer || {};

    const {
      address,
      address2,
      city,
      postcode,
      country,
    } = deliveryAddress || {};

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order." });
    }
    if (!firstName || !lastName || !email || !address || !city) {
      return res.status(400).json({ success: false, message: "Delivery details are incomplete." });
    }

    const orderData = {
      customer: { firstName, lastName, email, phone },
      deliveryAddress: { address, address2, city, postcode, country: country || "Pakistan" },
      items,
      subtotal,
      shippingCost: shippingCost || 0,
      total,
      deliveryMethod: deliveryMethod || "standard",
      paymentMethod,
      paymentStatus: paymentMethod === "card" ? "paid" : "pending",
      courier: "Leopards Courier",
    };

    // Link to user if logged in
    if (req.user) {
      orderData.user = req.user._id;
    }

    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: {
        orderId:           order.orderId,
        _id:               order._id,
        total:             order.total,
        status:            order.status,
        estimatedDelivery: order.estimatedDelivery,
        items:             order.items,
        timeline:          order.timeline,
        createdAt:         order.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/orders/track/:orderId ────────────────────────────
const trackOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      orderId: orderId.toUpperCase(),
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found. Please check your order ID.",
      });
    }

    res.status(200).json({
      success: true,
      order: {
        orderId:           order.orderId,
        status:            order.status,
        createdAt:         order.createdAt,
        estimatedDelivery: order.estimatedDelivery,
        courier:           order.courier || "Leopards Courier",
        trackingNumber:    order.trackingNumber,
        deliveryAddress:   order.deliveryAddress,
        paymentMethod:     order.paymentMethod,
        paymentStatus:     order.paymentStatus,
        total:             order.total,
        items:             order.items,
        timeline:          order.timeline,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/orders/my-orders ─────────────────────────────────
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("orderId status total createdAt estimatedDelivery items paymentMethod");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/orders/:id (single, owner or admin) ──────────────
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id.toUpperCase() });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (
      req.user &&
      order.user &&
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/orders (admin: all orders) ───────────────────────
const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// ── PUT /api/orders/:id/status (admin) ────────────────────────
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber, courier } = req.body;

    const order = await Order.findOne({ orderId: req.params.id.toUpperCase() });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courier) order.courier = courier;

    const statusStepMap = {
      placed:            0,
      payment_confirmed: 1,
      processing:        2,
      dispatched:        3,
      out_for_delivery:  4,
      delivered:         5,
    };

    const stepIndex = statusStepMap[status];
    if (stepIndex !== undefined) {
      order.timeline = order.timeline.map((step, i) => ({
        ...step,
        done:   i <= stepIndex,
        active: i === stepIndex,
        date:
          i === stepIndex
            ? new Date().toLocaleDateString("en-GB", {
                day:    "numeric",
                month:  "long",
                hour:   "2-digit",
                minute: "2-digit",
              })
            : step.date,
      }));
    }

    await order.save();

    res.status(200).json({ success: true, message: "Order status updated.", order });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /api/orders/:id (admin) ────────────────────────────
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id.toUpperCase() });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    res.status(200).json({ success: true, message: "Order deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  trackOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};