import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order ?? null;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const orderId = order?.orderId ?? "—";
  const total   = order?.total ?? null;
  const items   = order?.items ?? [];

  return (
    <div className={`os-page ${visible ? "os-visible" : ""}`}>
      {/* Confetti dots (CSS animated) */}
      <div className="os-confetti" aria-hidden>
        {[...Array(18)].map((_, i) => (
          <span key={i} className={`os-dot os-dot-${i % 6}`} style={{ "--i": i }} />
        ))}
      </div>

      <div className="os-card">
        {/* Checkmark */}
        <div className="os-icon-wrap">
          <svg className="os-check" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
            <path className="os-check-path" d="M14 26l9 9 15-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="os-eyebrow">Order Confirmed</p>
        <h1 className="os-title">Thank you!</h1>
        <p className="os-sub">
          Your order has been placed and is being prepared with care.
          You'll receive a confirmation email shortly.
        </p>

        {/* Order ID badge */}
        <div className="os-order-id">
          <span className="os-order-label">Order ID</span>
          <span className="os-order-value">{orderId}</span>
        </div>

        {/* FIX: was { total && ... } which skips render when total is 0
            now uses { total !== null && ... } to safely handle zero-value orders */}
        {total !== null && (
          <div className="os-summary">
            <div className="os-summary-row">
              <span>Items ordered</span>
              <span>{items.length || "—"}</span>
            </div>
            <div className="os-summary-row">
              <span>Order total</span>
              <span className="os-total">£{total.toFixed(2)}</span>
            </div>
            <div className="os-summary-row">
              <span>Estimated delivery</span>
              <span>3 – 5 business days</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="os-actions">
          <button
            className="os-btn-primary"
            onClick={() =>
              navigate("/trackorder", {
                state: { prefillId: orderId },
              })
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M13 6l6 6-6 6"/>
            </svg>
            Track My Order
          </button>
          <button
            className="os-btn-secondary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

        {/* Help */}
        <p className="os-help">
          Questions? <a href="mailto:care@iconique.com">care@iconique.com</a>
        </p>
      </div>
    </div>
  );
}