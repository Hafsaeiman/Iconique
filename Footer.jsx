import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/* ── SVG Icons ── */
const IconMail     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>);
const IconStar     = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
const IconTruck    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>);
const IconReturn   = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9H6"/><path d="M6 7v5h5"/></svg>);
const IconPhone    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IconLocation = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const IconClose    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>);

/* ── Returns Modal ── */
const returnSteps = [
  {
    num: "01",
    color: "#c9a96e",           /* gold */
    title: "Initiate Return",
    desc:  "Contact us within 7 days of delivery at returns@iconique.pk with your order number and reason.",
    badge: "7-Day Window",
    badgeColor: "#c9a96e",
  },
  {
    num: "02",
    color: "#7ec8a4",           /* mint green */
    title: "Pack the Item",
    desc:  "Repack in original packaging with all tags attached and the invoice inside. Unworn items only.",
    badge: "Original Tags Required",
    badgeColor: "#7ec8a4",
  },
  {
    num: "03",
    color: "#8ab4f8",           /* soft blue */
    title: "Drop Off or Pickup",
    desc:  "Drop at any TCS / Leopards outlet, or request a free home pickup from Islamabad, Lahore or Karachi.",
    badge: "Free Pickup Available",
    badgeColor: "#8ab4f8",
  },
  {
    num: "04",
    color: "#f4a4c0",           /* rose pink */
    title: "Refund or Exchange",
    desc:  "Once received and inspected (2–3 days), refund processed within 5–7 business days or exchange shipped immediately.",
    badge: "Full Refund Guaranteed",
    badgeColor: "#f4a4c0",
  },
];

function ReturnsModal({ onClose }) {
  return (
    <div className="ic-modal-overlay" onClick={onClose}>
      <div className="ic-returns-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="ic-rm-header">
          <div className="ic-rm-header-icon">
            <IconReturn />
          </div>
          <div>
            <h2 className="ic-rm-title">Returns & Exchanges</h2>
            <p className="ic-rm-subtitle">Hassle-free — your satisfaction comes first</p>
          </div>
          <button className="ic-rm-close" onClick={onClose}><IconClose /></button>
        </div>

        {/* Policy badges row */}
        <div className="ic-rm-badges">
          <span className="ic-rm-badge" style={{ color: "#c9a96e", borderColor: "rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.08)" }}>📅 7 Days</span>
          <span className="ic-rm-badge" style={{ color: "#7ec8a4", borderColor: "rgba(126,200,164,0.3)", background: "rgba(126,200,164,0.08)" }}>🔄 Free Exchange</span>
          <span className="ic-rm-badge" style={{ color: "#8ab4f8", borderColor: "rgba(138,180,248,0.3)", background: "rgba(138,180,248,0.08)" }}>🏠 Home Pickup</span>
          <span className="ic-rm-badge" style={{ color: "#f4a4c0", borderColor: "rgba(244,164,192,0.3)", background: "rgba(244,164,192,0.08)" }}>💳 Full Refund</span>
        </div>

        {/* Steps */}
        <div className="ic-rm-steps">
          {returnSteps.map((s) => (
            <div className="ic-rm-step" key={s.num} style={{ borderLeftColor: s.color }}>
              <div className="ic-rm-step-num" style={{ color: s.color }}>{s.num}</div>
              <div className="ic-rm-step-body">
                <div className="ic-rm-step-top">
                  <h3 className="ic-rm-step-title" style={{ color: s.color }}>{s.title}</h3>
                  <span className="ic-rm-step-badge" style={{ color: s.badgeColor, borderColor: s.badgeColor + "44", background: s.badgeColor + "14" }}>
                    {s.badge}
                  </span>
                </div>
                <p className="ic-rm-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Non-returnable note */}
        <div className="ic-rm-note">
          <span className="ic-rm-note-icon">⚠️</span>
          <p className="ic-rm-note-text">
            <strong style={{ color: "#f4a4c0" }}>Non-returnable:</strong>{" "}
            Sale items, innerwear, and customised pieces cannot be returned or exchanged.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="ic-rm-footer">
          <a href="mailto:returns@iconique.pk" className="ic-rm-cta-primary">
            Email Returns Team
          </a>
          <a href="tel:+923214567890" className="ic-rm-cta-secondary">
            Call +92 321 456-7890
          </a>
        </div>

      </div>
    </div>
  );
}

/* ── Data ── */
const shopLinks = [
  { label: "Women",        to: "/women" },
  { label: "Men",          to: "/men" },
  { label: "Kids",         to: "/kids" },
  { label: "Shoes",        to: "/shoes" },
  { label: "Bags",         to: "/bags" },
  { label: "Jewelry",      to: "/jewelry" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale",         to: "/sale" },
];

const legalLinks = [
  { label: "Privacy Policy",     to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Settings",    to: "/cookies" },
  { label: "Accessibility",      to: "/accessibility" },
];

/* ── FOOTER ── */
export default function Footer() {
  const [showReturns, setShowReturns] = useState(false);

  return (
    <>
      <footer className="ic-footer">
        <div className="ic-footer-bg" />

        <div className="ic-footer-container">

          {/* ── 3-COLUMN GRID ── */}
          <div className="ic-footer-grid">

            {/* COL 1 — BRAND */}
            <div className="ic-col ic-col-brand">
              <div className="ic-brand-header">
                <div className="ic-brand-logo">ICONIQUE</div>
                <div className="ic-brand-tagline">Luxury Fashion Collective</div>
              </div>

              <p className="ic-brand-desc">
                Discover exquisite collections crafted with precision and passion.
                We celebrate individuality through timeless elegance and contemporary
                style. Every piece tells a story.
              </p>

              <div className="ic-contact-info">
                <div className="ic-contact-item">
                  <IconPhone />
                  <div>
                    <p className="ic-contact-label">Call Us</p>
                    <p className="ic-contact-value">+92 (321) 456-7890</p>
                  </div>
                </div>
                <div className="ic-contact-item">
                  <IconLocation />
                  <div>
                    <p className="ic-contact-label">Visit Us</p>
                    <p className="ic-contact-value">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="ic-social-links">
                <a href="https://facebook.com"  className="ic-social-btn" target="_blank" rel="noreferrer" title="Facebook">f</a>
                <a href="https://instagram.com" className="ic-social-btn" target="_blank" rel="noreferrer" title="Instagram">📷</a>
                <a href="https://twitter.com"   className="ic-social-btn" target="_blank" rel="noreferrer" title="Twitter">𝕏</a>
                <a href="https://linkedin.com"  className="ic-social-btn" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
              </div>
            </div>

            {/* COL 2 — SHOP */}
            <div className="ic-col">
              <h3 className="ic-col-heading">Shop</h3>
              <ul className="ic-col-list">
                {shopLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="ic-col-btn">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3 — CONNECT */}
            <div className="ic-col">
              <h3 className="ic-col-heading">Connect</h3>
              <div className="ic-footer-actions">

                {/* Contact → full page */}
                <Link to="/contact" className="ic-action-btn ic-action-primary">
                  <IconMail /> Contact Us
                </Link>

                {/* Review → full page */}
                <Link to="/reviews" className="ic-action-btn">
                  <IconStar /> Write a Review
                </Link>

                {/* Track Order → full page */}
                <Link to="/trackorder" className="ic-action-btn">
                  <IconTruck /> Track Order
                </Link>

                {/* Returns → modal popup */}
                <button className="ic-action-btn" onClick={() => setShowReturns(true)}>
                  <IconReturn /> Returns & Exchanges
                </button>

              </div>
            </div>

          </div>

          {/* ── PAYMENT METHODS ── */}
          <div className="ic-payments">
            <span className="ic-pay-label">We Accept</span>
            <div className="ic-pay-icons">
              {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "JazzCash", "EasyPaisa"].map(item => (
                <span key={item} className="ic-pay-icon">{item}</span>
              ))}
            </div>
          </div>

          {/* ── FOOTER BOTTOM ── */}
          <div className="ic-footer-bottom">
            <span className="ic-copyright">
              © 2025 Iconique Connect. All rights reserved. | Proudly made in Pakistan 🇵🇰
            </span>
            <div className="ic-footer-legal">
              {legalLinks.map(item => (
                <Link key={item.to} to={item.to} className="ic-legal-btn">{item.label}</Link>
              ))}
            </div>
          </div>

        </div>
      </footer>

      {/* Returns Modal — rendered outside footer so it overlays entire page */}
      {showReturns && <ReturnsModal onClose={() => setShowReturns(false)} />}
    </>
  );
}