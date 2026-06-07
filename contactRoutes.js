const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

// Contact
router.post("/contact", submitContact);
router.get("/contact", protect, adminOnly, getAllContacts);
router.put("/contact/:id/status", protect, adminOnly, updateContactStatus);

// Newsletter
router.post("/newsletter/subscribe", subscribeNewsletter);
router.post("/newsletter/unsubscribe", unsubscribeNewsletter);

module.exports = router;