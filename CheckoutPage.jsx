import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/ShopContext";
import "./CheckoutPage.css";

const STEPS = ["Bag", "Delivery", "Payment"];

// ── Helpers ──────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="ck-steps">
      {STEPS.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "idle";
        return (
          <div key={s} className={`ck-step ck-step--${state}`}>
            <div className="ck-step__bubble">
              {i < current ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span className="ck-step__label">{s}</span>
            {i < STEPS.length - 1 && <div className="ck-step__line" />}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, id, error, hint, ...props }) {
  return (
    <div className="ck-field">
      <label className="ck-label" htmlFor={id}>{label}</label>
      <input className={`ck-input ${error ? "ck-input--err" : ""}`} id={id} {...props} />
      {error && <span className="ck-field-err"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>{error}</span>}
      {hint && !error && <span className="ck-field-hint">{hint}</span>}
    </div>
  );
}

// ── Step 1: Bag Review ────────────────────────────────────────
function StepBag({ cart, cartTotal, onNext }) {
  if (cart.length === 0) {
    return (
      <div className="ck-empty">
        <div className="ck-empty__icon">🛍</div>
        <h3>Your bag is empty</h3>
        <p>Add some pieces to your bag before checking out.</p>
      </div>
    );
  }
  return (
    <div className="ck-bag">
      <div className="ck-bag__list">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="ck-bag__item">
            <div className="ck-bag__img-wrap">
              <img src={item.image} alt={item.name} className="ck-bag__img" />
              <span className="ck-bag__qty-badge">{item.qty}</span>
            </div>
            <div className="ck-bag__info">
              <p className="ck-bag__name">{item.name}</p>
              <p className="ck-bag__meta">
                {item.color && <span>{item.color}</span>}
                {item.selectedSize && item.selectedSize !== "One Size" && (
                  <><span className="ck-bag__dot">·</span><span>Size {item.selectedSize}</span></>
                )}
              </p>
            </div>
            <p className="ck-bag__price">£{(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="ck-bag__summary">
        <div className="ck-summary-row">
          <span>Subtotal</span><span>£{cartTotal.toFixed(2)}</span>
        </div>
        <div className="ck-summary-row">
          <span>Shipping</span>
          <span className={cartTotal >= 120 ? "ck-free" : ""}>
            {cartTotal >= 120 ? "Free" : "£4.99"}
          </span>
        </div>
        <div className="ck-summary-row ck-summary-row--total">
          <span>Total</span>
          <span>£{(cartTotal + (cartTotal >= 120 ? 0 : 4.99)).toFixed(2)}</span>
        </div>
      </div>

      {cartTotal < 120 && (
        <div className="ck-shipping-nudge">
          <span>🚚</span>
          <span>
            Add <strong>£{(120 - cartTotal).toFixed(2)}</strong> more for free shipping
          </span>
        </div>
      )}

      <button className="ck-btn-primary" onClick={onNext}>
        Continue to Delivery
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

// ── Step 2: Delivery ──────────────────────────────────────────
function StepDelivery({ form, setForm, errors, touched, onNext, onBack }) {
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="ck-delivery">
      <h3 className="ck-section-title">Contact</h3>
      <div className="ck-grid-2">
        <Field
          label="First name" id="firstName"
          value={form.firstName} onChange={set("firstName")}
          error={touched.firstName ? errors.firstName : ""}
          placeholder="Aisha"
          autoComplete="given-name"
        />
        <Field
          label="Last name" id="lastName"
          value={form.lastName} onChange={set("lastName")}
          error={touched.lastName ? errors.lastName : ""}
          placeholder="Khan"
          autoComplete="family-name"
        />
      </div>
      <Field
        label="Email address" id="email" type="email"
        value={form.email} onChange={set("email")}
        error={touched.email ? errors.email : ""}
        placeholder="aisha@example.com"
        autoComplete="email"
      />
      <Field
        label="Phone number" id="phone" type="tel"
        value={form.phone} onChange={set("phone")}
        error={touched.phone ? errors.phone : ""}
        hint="Include country code e.g. +92 300 000 0000"
        placeholder="+92 300 000 0000"
        autoComplete="tel"
      />

      <h3 className="ck-section-title" style={{ marginTop: 32 }}>Delivery address</h3>
      <Field
        label="Address line 1" id="address"
        value={form.address} onChange={set("address")}
        error={touched.address ? errors.address : ""}
        placeholder="House 12, Street 4"
        autoComplete="address-line1"
      />
      <Field
        label="Address line 2 (optional)" id="address2"
        value={form.address2} onChange={set("address2")}
        placeholder="Apartment, suite, floor, etc."
        autoComplete="address-line2"
      />
      <div className="ck-grid-2">
        <Field
          label="City" id="city"
          value={form.city} onChange={set("city")}
          error={touched.city ? errors.city : ""}
          placeholder="Islamabad"
          autoComplete="address-level2"
        />
        <Field
          label="Postcode" id="postcode"
          value={form.postcode} onChange={set("postcode")}
          error={touched.postcode ? errors.postcode : ""}
          placeholder="44000"
          autoComplete="postal-code"
          inputMode="numeric"
        />
      </div>
      <Field
        label="Country" id="country"
        value={form.country} onChange={set("country")}
        placeholder="Pakistan"
        autoComplete="country-name"
      />

      <h3 className="ck-section-title" style={{ marginTop: 32 }}>Delivery method</h3>
      <div className="ck-delivery-options">
        {[
          { id: "standard", label: "Standard Delivery", sub: "3–5 business days", price: "Free on orders over £120" },
          { id: "express",  label: "Express Delivery",  sub: "1–2 business days",  price: "£9.99" },
        ].map((opt) => (
          <label key={opt.id} className={`ck-delivery-opt ${form.deliveryMethod === opt.id ? "ck-delivery-opt--active" : ""}`}>
            <input type="radio" name="deliveryMethod" value={opt.id} checked={form.deliveryMethod === opt.id} onChange={set("deliveryMethod")} />
            <div className="ck-delivery-opt__radio">
              <div className={`ck-radio-dot ${form.deliveryMethod === opt.id ? "ck-radio-dot--active" : ""}`} />
            </div>
            <div className="ck-delivery-opt__info">
              <span className="ck-delivery-opt__label">{opt.label}</span>
              <span className="ck-delivery-opt__sub">{opt.sub}</span>
            </div>
            <span className="ck-delivery-opt__price">{opt.price}</span>
          </label>
        ))}
      </div>

      <div className="ck-btn-row">
        <button className="ck-btn-ghost" onClick={onBack}>← Back</button>
        <button className="ck-btn-primary" onClick={onNext}>
          Continue to Payment
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Payment ───────────────────────────────────────────
function StepPayment({ form, setForm, errors, touched, cartTotal, onPlace, onBack, placing }) {
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const shippingCost = cartTotal >= 120 ? 0 : (form.deliveryMethod === "express" ? 9.99 : 4.99);
  const finalTotal = cartTotal + shippingCost;

  const formatCard = (val) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const rawCard = form.cardNumber.replace(/\s/g, "");
  const cardType = rawCard.startsWith("4") ? "visa" : rawCard.startsWith("5") || rawCard.startsWith("2") ? "mc" : null;

  return (
    <div className="ck-payment">
      <h3 className="ck-section-title">Payment method</h3>

      <div className="ck-pay-tabs">
        {[
          { id: "card",      icon: "💳", label: "Card" },
          { id: "cod",       icon: "💵", label: "Cash on Delivery" },
          { id: "easypaisa", icon: "📱", label: "EasyPaisa" },
        ].map((m) => (
          <button
            key={m.id}
            className={`ck-pay-tab ${form.payMethod === m.id ? "ck-pay-tab--active" : ""}`}
            onClick={() => setForm((p) => ({ ...p, payMethod: m.id }))}
            type="button"
          >
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {form.payMethod === "card" && (
        <div className="ck-card-fields">
          <div className="ck-field">
            <label className="ck-label" htmlFor="cardName">Name on card</label>
            <input
              className={`ck-input ${touched.cardName && errors.cardName ? "ck-input--err" : ""}`}
              id="cardName"
              value={form.cardName}
              onChange={set("cardName")}
              placeholder="Aisha Khan"
              autoComplete="cc-name"
            />
            {touched.cardName && errors.cardName && (
              <span className="ck-field-err">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                {errors.cardName}
              </span>
            )}
          </div>

          <div className="ck-field">
            <label className="ck-label" htmlFor="cardNumber">Card number</label>
            <div className="ck-card-input-wrap">
              <input
                className={`ck-input ${touched.cardNumber && errors.cardNumber ? "ck-input--err" : ""}`}
                id="cardNumber"
                value={form.cardNumber}
                onChange={(e) => setForm((p) => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={19}
              />
              <div className="ck-card-icons">
                <span className={`ck-card-badge ${cardType === "visa" ? "ck-card-badge--active" : ""}`}>VISA</span>
                <span className={`ck-card-badge ${cardType === "mc" ? "ck-card-badge--active" : ""}`}>MC</span>
              </div>
            </div>
            {touched.cardNumber && errors.cardNumber && (
              <span className="ck-field-err">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                {errors.cardNumber}
              </span>
            )}
          </div>

          <div className="ck-grid-2">
            <div className="ck-field">
              <label className="ck-label" htmlFor="cardExpiry">Expiry date</label>
              <input
                className={`ck-input ${touched.cardExpiry && errors.cardExpiry ? "ck-input--err" : ""}`}
                id="cardExpiry"
                value={form.cardExpiry}
                onChange={(e) => setForm((p) => ({ ...p, cardExpiry: formatExpiry(e.target.value) }))}
                placeholder="MM/YY"
                inputMode="numeric"
                autoComplete="cc-exp"
                maxLength={5}
              />
              {touched.cardExpiry && errors.cardExpiry && (
                <span className="ck-field-err">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  {errors.cardExpiry}
                </span>
              )}
            </div>
            <div className="ck-field">
              <label className="ck-label" htmlFor="cardCvc">CVC / CVV</label>
              <input
                className={`ck-input ${touched.cardCvc && errors.cardCvc ? "ck-input--err" : ""}`}
                id="cardCvc"
                value={form.cardCvc}
                onChange={(e) => setForm((p) => ({ ...p, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                placeholder="•••"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
              />
              {touched.cardCvc && errors.cardCvc && (
                <span className="ck-field-err">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  {errors.cardCvc}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {form.payMethod === "cod" && (
        <div className="ck-pay-info">
          <span>💵</span>
          <p>Pay in cash when your order arrives at your door. No extra charges.</p>
        </div>
      )}

      {form.payMethod === "easypaisa" && (
        <div className="ck-pay-info">
          <span>📱</span>
          <p>You'll receive an EasyPaisa payment request on your registered mobile number after placing the order.</p>
        </div>
      )}

      <div className="ck-pay-total">
        <div className="ck-pay-total__breakdown">
          <div className="ck-pay-total__row"><span>Subtotal</span><span>£{cartTotal.toFixed(2)}</span></div>
          <div className="ck-pay-total__row">
            <span>Shipping ({form.deliveryMethod === "express" ? "Express" : "Standard"})</span>
            <span className={shippingCost === 0 ? "ck-free" : ""}>{shippingCost === 0 ? "Free" : `£${shippingCost.toFixed(2)}`}</span>
          </div>
        </div>
        <div className="ck-pay-total__final">
          <span>Order total</span>
          <span className="ck-pay-total__val">£{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="ck-secure-note">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Payments are encrypted and secure
      </div>

      <div className="ck-btn-row">
        <button className="ck-btn-ghost" onClick={onBack} disabled={placing}>← Back</button>
        <button className="ck-btn-primary ck-btn-place" onClick={onPlace} disabled={placing}>
          {placing ? (
            <><span className="ck-spinner" /> Processing…</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Place Order · £{finalTotal.toFixed(2)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Validation helpers ────────────────────────────────────────
function validateDeliveryForm(form) {
  const e = {};

  if (!form.firstName.trim()) e.firstName = "First name is required";
  else if (form.firstName.trim().length < 2) e.firstName = "Must be at least 2 characters";
  else if (!/^[a-zA-Z\s'-]+$/.test(form.firstName)) e.firstName = "Only letters, spaces, hyphens allowed";

  if (!form.lastName.trim()) e.lastName = "Last name is required";
  else if (form.lastName.trim().length < 2) e.lastName = "Must be at least 2 characters";
  else if (!/^[a-zA-Z\s'-]+$/.test(form.lastName)) e.lastName = "Only letters, spaces, hyphens allowed";

  if (!form.email.trim()) e.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = "Enter a valid email address";

  const cleanPhone = form.phone.replace(/[\s\-().]/g, "");
  if (!form.phone.trim()) e.phone = "Phone number is required";
  else if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) e.phone = "Enter a valid phone number (7–15 digits)";

  if (!form.address.trim()) e.address = "Address is required";
  else if (form.address.trim().length < 5) e.address = "Please enter your full address";

  if (!form.city.trim()) e.city = "City is required";
  else if (!/^[a-zA-Z\s'-]+$/.test(form.city)) e.city = "Enter a valid city name";

  if (!form.postcode.trim()) e.postcode = "Postcode is required";
  else if (form.postcode.trim().length < 3) e.postcode = "Enter a valid postcode";

  return e;
}

function validatePaymentForm(form) {
  if (form.payMethod !== "card") return {};
  const e = {};

  if (!form.cardName.trim()) e.cardName = "Cardholder name is required";
  else if (form.cardName.trim().length < 3) e.cardName = "Enter the full name on your card";
  else if (!/^[a-zA-Z\s'-]+$/.test(form.cardName)) e.cardName = "Name should only contain letters";

  const rawCard = form.cardNumber.replace(/\s/g, "");
  if (!rawCard) e.cardNumber = "Card number is required";
  else if (rawCard.length < 16) e.cardNumber = "Enter all 16 card digits";
  else if (!/^\d+$/.test(rawCard)) e.cardNumber = "Card number must contain only digits";

  if (!form.cardExpiry) e.cardExpiry = "Expiry date is required";
  else if (form.cardExpiry.length < 5) e.cardExpiry = "Enter expiry as MM/YY";
  else {
    const [mm, yy] = form.cardExpiry.split("/");
    const month = parseInt(mm, 10);
    const year  = parseInt(`20${yy}`, 10);
    const now   = new Date();
    if (month < 1 || month > 12) e.cardExpiry = "Month must be 01–12";
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
      e.cardExpiry = "This card has expired";
  }

  if (!form.cardCvc) e.cardCvc = "CVC is required";
  else if (form.cardCvc.length < 3) e.cardCvc = "CVC must be 3 or 4 digits";

  return e;
}

// ── Main CheckoutPage ─────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const [step, setStep]       = useState(0);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", address2: "", city: "", postcode: "", country: "Pakistan",
    deliveryMethod: "standard",
    payMethod: "card",
    cardName: "", cardNumber: "", cardExpiry: "", cardCvc: "",
  });

  const handleNextDelivery = () => {
    const deliveryFields = ["firstName","lastName","email","phone","address","city","postcode"];
    const newTouched = { ...touched };
    deliveryFields.forEach((f) => { newTouched[f] = true; });
    setTouched(newTouched);
    const e = validateDeliveryForm(form);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setErrors({});
    if (step === 1) { handleNextDelivery(); return; }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlace = async () => {
    const cardFields = ["cardName","cardNumber","cardExpiry","cardCvc"];
    const newTouched = { ...touched };
    cardFields.forEach((f) => { newTouched[f] = true; });
    setTouched(newTouched);
    const e = validatePaymentForm(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const shippingCost =
      cartTotal >= 120
        ? 0
        : form.deliveryMethod === "express"
        ? 9.99
        : 4.99;

    const orderData = {
      customer: {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone,
      },
      deliveryAddress: {
        address:  form.address,
        address2: form.address2,
        city:     form.city,
        postcode: form.postcode,
        country:  form.country,
      },
      items: cart.map((item) => ({
        productId:    item.id,
        name:         item.name,
        price:        item.price,
        qty:          item.qty,
        image:        item.image,
        selectedSize: item.selectedSize,
        color:        item.color,
        section:      item.section,
      })),
      subtotal:       cartTotal,
      shippingCost,
      total:          cartTotal + shippingCost,
      deliveryMethod: form.deliveryMethod,
      paymentMethod:  form.payMethod,
    };

    try {
      setPlacing(true);

      const response = await fetch("http://localhost:5000/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();
      navigate("/order-success", {
        state: { order: data.order },
        replace: true,
      });
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const handleFormChange = (updater) => {
    setForm((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      const deliveryErrs = validateDeliveryForm(next);
      const paymentErrs  = validatePaymentForm(next);
      const allErrs = { ...deliveryErrs, ...paymentErrs };
      const newErrors = {};
      Object.keys(touched).forEach((k) => {
        if (allErrs[k]) newErrors[k] = allErrs[k];
      });
      setErrors(newErrors);
      return next;
    });
  };

  return (
    <div className="ck-page">
      <header className="ck-header">
        <button className="ck-back-home" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back
        </button>
        <div className="ck-logo">ICONIQUE</div>
        <div className="ck-secure">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secure Checkout
        </div>
      </header>

      <div className="ck-layout">
        <div className="ck-main">
          <StepIndicator current={step} />

          <div className="ck-panel">
            {step === 0 && (
              <StepBag cart={cart} cartTotal={cartTotal} onNext={handleNext} />
            )}
            {step === 1 && (
              <StepDelivery
                form={form}
                setForm={handleFormChange}
                errors={errors}
                touched={touched}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === 2 && (
              <StepPayment
                form={form}
                setForm={handleFormChange}
                errors={errors}
                touched={touched}
                cartTotal={cartTotal}
                onPlace={handlePlace}
                onBack={handleBack}
                placing={placing}
              />
            )}
          </div>
        </div>

        <aside className="ck-sidebar">
          <div className="ck-sidebar__inner">
            <h3 className="ck-sidebar__title">Order Summary</h3>
            <div className="ck-sidebar__items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="ck-sidebar__item">
                  <div className="ck-sidebar__img-wrap">
                    <img src={item.image} alt={item.name} />
                    <span className="ck-sidebar__qty">{item.qty}</span>
                  </div>
                  <div className="ck-sidebar__info">
                    <p className="ck-sidebar__name">{item.name}</p>
                    {item.selectedSize && item.selectedSize !== "One Size" && (
                      <p className="ck-sidebar__size">Size {item.selectedSize}</p>
                    )}
                  </div>
                  <p className="ck-sidebar__price">£{(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="ck-sidebar__totals">
              <div className="ck-sidebar__row">
                <span>Subtotal</span><span>£{cartTotal.toFixed(2)}</span>
              </div>
              <div className="ck-sidebar__row">
                <span>Shipping</span>
                <span className={cartTotal >= 120 ? "ck-free" : ""}>
                  {cartTotal >= 120 ? "Free" : "£4.99"}
                </span>
              </div>
              <div className="ck-sidebar__row ck-sidebar__row--total">
                <span>Total</span>
                <span>£{(cartTotal + (cartTotal >= 120 ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>

            <div className="ck-sidebar__perks">
              <div className="ck-perk"><span>🚚</span><span>Free shipping over £120</span></div>
              <div className="ck-perk"><span>↩</span><span>Free returns within 30 days</span></div>
              <div className="ck-perk"><span>🔒</span><span>SSL encrypted checkout</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}