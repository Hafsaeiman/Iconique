import React, { useState, useRef } from "react";
import "./ContactForm.css";
import axios from "axios";
// import API from "../api/axios";

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 6l10 7 10-7" />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";

    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";

    return e;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/misc/contact",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }
      );

      console.log(data);
      setSubmitted(true);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  const subscribeNewsletter = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/misc/newsletter/subscribe",
        { email: newsletterEmail,
// if (!newsletterEmail.trim()) {
//   alert("Email is required");
//   return;
// }        
}
      );

      alert(data.message);
      setNewsletterEmail("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Subscription failed"
      );
    }
  };

  const infoCards = [
    {
      icon: <IconPhone />,
      label: "Call Us",
      value: "+92 (321) 456-7890",
      sub: "Mon – Sat, 10am – 7pm",
    },
    {
      icon: <IconMail />,
      label: "Email Us",
      value: "hello@iconique.pk",
      sub: "Reply within 24 hours",
    },
    {
      icon: <IconLocation />,
      label: "Visit Us",
      value: "Islamabad, Pakistan",
      sub: "Blue Area, F-7 Markaz",
    },
    {
      icon: <IconClock />,
      label: "Work Hours",
      value: "7 AM – 8 PM",
      sub: "Monday to Saturday",
    },
  ];

  return (
    <section className="cf-section">
      {/* Decorative bg elements */}
      <div className="cf-bg-orb cf-bg-orb-1" />
      <div className="cf-bg-orb cf-bg-orb-2" />

      {/* HERO HEADER */}
      <div className="cf-hero">
        <p className="cf-hero-eyebrow">— We'd Love to Hear From You —</p>
        <h1 className="cf-hero-title">Contact <em>Iconique</em></h1>
        <p className="cf-hero-sub">
          Reach out for styling advice, order inquiries, or partnership opportunities.
          Our team is always delighted to assist.
        </p>
      </div>

      {/* INFO CARDS ROW */}
      <div className="cf-info-row">
        {infoCards.map((card, i) => (
          <div className="cf-info-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="cf-info-icon">{card.icon}</div>
            <div>
              <p className="cf-info-label">{card.label}</p>
              <p className="cf-info-value">{card.value}</p>
              <p className="cf-info-sub">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="cf-main">

        {/* LEFT PANEL */}
        <div className="cf-left">
          <div className="cf-left-badge">Get In Touch</div>
          <h2 className="cf-left-title">Send Us a <br /><span>Message</span></h2>
          <p className="cf-left-desc">
            Whether you have a question about our collections, need styling assistance,
            or want to explore a collaboration — we're here for you.
          </p>

          <div className="cf-divider" />

          <div className="cf-left-social-label">Follow Us</div>
          <div className="cf-social-row">
            <a href="#instagram" className="cf-social"><IconInstagram /></a>
            <a href="#facebook" className="cf-social"><IconFacebook /></a>
            <a href="#twitter" className="cf-social"><IconTwitter /></a>
          </div>

          {/* Decorative fashion image block */}
          <div className="cf-left-img-block">
            <div className="cf-left-img-inner">
              <div className="cf-img-text">ICONIQUE</div>
              <div className="cf-img-sub">Luxury Fashion Collective</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="cf-right">
          {submitted ? (
            <div className="cf-success">
              <div className="cf-success-ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="40" height="40">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              <button className="cf-btn cf-btn-outline" onClick={handleReset}>Send Another Message</button>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-form-row">
                <div className={`cf-field ${errors.name ? "cf-field-error" : ""} ${focused === "name" ? "cf-field-focused" : ""}`}>
                  <label htmlFor="cf-name">Full Name *</label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => handleChange("name", e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                  />
                  {errors.name && <span className="cf-error-msg">{errors.name}</span>}
                </div>

                <div className={`cf-field ${errors.email ? "cf-field-error" : ""} ${focused === "email" ? "cf-field-focused" : ""}`}>
                  <label htmlFor="cf-email">Email Address *</label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                  />
                  {errors.email && <span className="cf-error-msg">{errors.email}</span>}
                </div>
              </div>

              <div className={`cf-field ${focused === "subject" ? "cf-field-focused" : ""}`}>
                <label htmlFor="cf-subject">Subject</label>
                <input
                  id="cf-subject"
                  type="text"
                  placeholder="What's this regarding?"
                  value={form.subject}
                  onChange={e => handleChange("subject", e.target.value)}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className={`cf-field ${errors.message ? "cf-field-error" : ""} ${focused === "message" ? "cf-field-focused" : ""}`}>
                <label htmlFor="cf-message">Message *</label>
                <textarea
                  id="cf-message"
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={e => handleChange("message", e.target.value)}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                />
                {errors.message && <span className="cf-error-msg">{errors.message}</span>}
                <div className="cf-char-count">{form.message.length} characters</div>
              </div>

              <button type="submit" className={`cf-btn cf-btn-primary ${loading ? "cf-btn-loading" : ""}`} disabled={loading}>
                {loading ? (
                  <span className="cf-spinner" />
                ) : (
                  <>Send Message <span className="cf-btn-arrow">→</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* NEWSLETTER STRIP */}
      <div className="cf-newsletter">
        <div className="cf-newsletter-inner">
          <div>
            <h3>Our Newsletter</h3>
            <p>Stay in the loop with new arrivals, exclusive offers & style edits.</p>
          </div>
          <div className="cf-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="cf-nl-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button className="cf-nl-btn" onClick={subscribeNewsletter}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}