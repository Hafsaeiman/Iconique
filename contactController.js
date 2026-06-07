const Contact = require("../models/Contact");
const Newsletter = require("../models/Newsletter");

// ── POST /api/contact ─────────────────────────────────────────
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject: subject || "General Enquiry",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We will reply within 24 hours.",
      id: contact._id,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /api/contact (admin) ──────────────────────────────────
const getAllContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ]);

    res.status(200).json({ success: true, total, contacts });
  } catch (error) {
    next(error);
  }
};

// ── PUT /api/contact/:id/status (admin) ───────────────────────
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, ...(status === "replied" ? { repliedAt: new Date() } : {}) },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }
    res.status(200).json({ success: true, message: "Status updated.", contact });
  } catch (error) {
    next(error);
  }
};

// ── POST /api/newsletter/subscribe ────────────────────────────
const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return res.status(200).json({
          success: true,
          message: "Welcome back! You have been re-subscribed.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "You are already subscribed to our newsletter.",
      });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Thank you for subscribing! Welcome to the Iconique circle.",
    });
  } catch (error) {
    next(error);
  }
};

// ── POST /api/newsletter/unsubscribe ──────────────────────────
const unsubscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    await Newsletter.findOneAndUpdate({ email: email.toLowerCase() }, { isActive: false });
    res.status(200).json({ success: true, message: "You have been unsubscribed." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
};