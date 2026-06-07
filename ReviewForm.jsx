import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ReviewForm.css";
// import API from "../api/axios";
import axios from "axios";
/* ── Icons ── */
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" />
  </svg>
);

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CATEGORIES = [
  "Women's Clothing",
  "Men's Clothing",
  "Kids' Clothing",
  "Shoes",
  "Bags & Accessories",
  "Jewelry",
  "Sale Items",
  "Other",
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function ReviewForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    category: "",
    title: "",
    body: "",
    recommend: null,
  });
  const [rating, setRating]     = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name     = "Your name is required";
    if (!form.email.trim())              e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                         e.email    = "Enter a valid email address";
    if (!rating)                         e.rating   = "Please select a star rating";
    if (!form.title.trim())              e.title    = "Review title is required";
    if (!form.body.trim())               e.body     = "Please write your review";
    else if (form.body.trim().length < 20)
                                         e.body     = "Review must be at least 20 characters";
    if (form.recommend === null)         e.recommend= "Please select an option";
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/reviews",
      {
        name: form.name,
        email: form.email,
        productName: form.product,
        category: form.category,
        rating: rating,
        title: form.title,
        body: form.body,
        recommend: form.recommend,
      }
    );

    console.log(response.data);
    setSubmitted(true);

  } catch (error) {
    console.error("Review Error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to submit review"
    );
  } finally {
    setLoading(false);
  }
};
  const activeStar = hoverStar || rating;

  if (submitted) {
    return (
      <div className="rv-section">
        <div className="rv-bg" />
        <div className="rv-success-wrap">
          <div className="rv-success-card">
            <div className="rv-success-ring">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="44" height="44">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p>
              Your review has been submitted and is awaiting approval.
              We appreciate you taking the time to share your experience.
            </p>
            <div className="rv-success-actions">
              <Link to="/" className="rv-btn rv-btn-outline">
                <IconHome /> Back to Home
              </Link>
              <Link to="/women" className="rv-btn rv-btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rv-section">
      {/* Decorative background */}
      <div className="rv-bg" />

      {/* Breadcrumb */}
      <div className="rv-breadcrumb">
        <div className="rv-breadcrumb-inner">
          <Link to="/" className="rv-bread-link">
            <IconHome /> Home
          </Link>
          <span className="rv-bread-sep">›</span>
          <span className="rv-bread-current">Write a Review</span>
        </div>
      </div>

      {/* Hero */}
      <div className="rv-hero">
        <button className="rv-back-btn" onClick={() => navigate(-1)}>
          <IconArrowLeft /> Back
        </button>
        <p className="rv-eyebrow">Share Your Experience</p>
        <h1 className="rv-title">Write a <em>Review</em></h1>
        <p className="rv-sub">
          Your honest feedback helps other shoppers and helps us improve.
          We read every single review.
        </p>
      </div>

      {/* Main card */}
      <div className="rv-container">
        <div className="rv-card">

          {/* Left info panel */}
          <div className="rv-info-panel">
            <div className="rv-info-badge">Why Review?</div>
            <h3 className="rv-info-title">Your voice <em>matters</em></h3>
            <ul className="rv-info-list">
              <li>
                <span className="rv-info-dot" />
                Help fellow shoppers make confident choices
              </li>
              <li>
                <span className="rv-info-dot" />
                Share styling tips and honest feedback
              </li>
              <li>
                <span className="rv-info-dot" />
                Shape the collections we curate for you
              </li>
              <li>
                <span className="rv-info-dot" />
                Approved reviews go live within 24 hours
              </li>
            </ul>

            <div className="rv-info-divider" />

            <div className="rv-info-stat-row">
              <div className="rv-info-stat">
                <span className="rv-info-stat-num">4.8★</span>
                <span className="rv-info-stat-label">Average Rating</span>
              </div>
              <div className="rv-info-stat">
                <span className="rv-info-stat-num">2.4k+</span>
                <span className="rv-info-stat-label">Happy Customers</span>
              </div>
            </div>

            <div className="rv-info-shop-cta">
              <p>Looking for something new?</p>
              <Link to="/women">
                <button className="rv-shop-btn">Shop Now →</button>
              </Link>
            </div>
          </div>

          {/* Right form panel */}
          <div className="rv-form-panel">
            <form className="rv-form" onSubmit={handleSubmit} noValidate>

              {/* Row 1: Name + Email */}
              <div className="rv-row">
                <div className={`rv-field ${errors.name ? "rv-field-err" : ""}`}>
                  <label htmlFor="rv-name">Your Name *</label>
                  <input
                    id="rv-name"
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={e => set("name", e.target.value)}
                  />
                  {errors.name && <span className="rv-err">{errors.name}</span>}
                </div>
                <div className={`rv-field ${errors.email ? "rv-field-err" : ""}`}>
                  <label htmlFor="rv-email">Email Address *</label>
                  <input
                    id="rv-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                  />
                  {errors.email && <span className="rv-err">{errors.email}</span>}
                </div>
              </div>

              {/* Row 2: Product + Category */}
              <div className="rv-row">
                <div className="rv-field">
                  <label htmlFor="rv-product">Product Name</label>
                  <input
                    id="rv-product"
                    type="text"
                    placeholder="e.g. Silk Wrap Dress"
                    value={form.product}
                    onChange={e => set("product", e.target.value)}
                  />
                </div>
                <div className="rv-field">
                  <label htmlFor="rv-category">Category</label>
                  <select
                    id="rv-category"
                    value={form.category}
                    onChange={e => set("category", e.target.value)}
                    className="rv-select"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Star Rating */}
              <div className={`rv-field ${errors.rating ? "rv-field-err" : ""}`}>
                <label>Overall Rating *</label>
                <div className="rv-stars-wrap">
                  <div className="rv-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`rv-star ${star <= activeStar ? "rv-star-on" : ""}`}
                        onClick={() => { setRating(star); if (errors.rating) setErrors(e => ({ ...e, rating: "" })); }}
                        onMouseEnter={() => setHoverStar(star)}
                        onMouseLeave={() => setHoverStar(0)}
                        aria-label={`${star} star`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {activeStar > 0 && (
                    <span className="rv-star-label">{RATING_LABELS[activeStar]}</span>
                  )}
                </div>
                {errors.rating && <span className="rv-err">{errors.rating}</span>}
              </div>

              {/* Review Title */}
              <div className={`rv-field ${errors.title ? "rv-field-err" : ""}`}>
                <label htmlFor="rv-title">Review Title *</label>
                <input
                  id="rv-title"
                  type="text"
                  placeholder="Sum it up in a few words"
                  value={form.title}
                  onChange={e => set("title", e.target.value)}
                />
                {errors.title && <span className="rv-err">{errors.title}</span>}
              </div>

              {/* Review Body */}
              <div className={`rv-field ${errors.body ? "rv-field-err" : ""}`}>
                <label htmlFor="rv-body">Your Review *</label>
                <textarea
                  id="rv-body"
                  rows="6"
                  placeholder="Tell us about the quality, fit, styling, and overall experience…"
                  value={form.body}
                  onChange={e => set("body", e.target.value)}
                />
                <div className="rv-char-count">{form.body.length} / 20 min characters</div>
                {errors.body && <span className="rv-err">{errors.body}</span>}
              </div>

              {/* Recommend */}
              <div className={`rv-field ${errors.recommend ? "rv-field-err" : ""}`}>
                <label>Would you recommend this to a friend? *</label>
                <div className="rv-recommend-row">
                  <button
                    type="button"
                    className={`rv-recommend-btn ${form.recommend === true ? "rv-rec-yes" : ""}`}
                    onClick={() => { set("recommend", true); }}
                  >
                    👍 Yes, definitely
                  </button>
                  <button
                    type="button"
                    className={`rv-recommend-btn ${form.recommend === false ? "rv-rec-no" : ""}`}
                    onClick={() => { set("recommend", false); }}
                  >
                    👎 Not really
                  </button>
                </div>
                {errors.recommend && <span className="rv-err">{errors.recommend}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`rv-btn rv-btn-primary rv-btn-full ${loading ? "rv-btn-loading" : ""}`}
                disabled={loading}
              >
                {loading ? <span className="rv-spinner" /> : <>Submit Review <span className="rv-arrow">→</span></>}
              </button>

              <p className="rv-disclaimer">
                By submitting you agree to our{" "}
                <Link to="/terms" className="rv-link">Terms & Conditions</Link>.
                Reviews are moderated before publishing.
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}