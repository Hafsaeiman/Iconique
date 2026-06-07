import { useCart } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();
  const { setCartOpen } = useDrawer();
  const navigate = useNavigate();

  const FREE_SHIP = 120;
  const progress = Math.min(100, (cartTotal / FREE_SHIP) * 100);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer__head">
          <div>
            <div className="cart-drawer__title">Shopping Bag</div>
            <div className="cart-drawer__count">
              {cartCount} item{cartCount !== 1 ? "s" : ""}
            </div>
          </div>
          <button className="cart-drawer__close" onClick={() => setCartOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        {cart.length > 0 && (
          <div className="cart-progress">
            <div className="cart-progress__label">
              {cartTotal >= FREE_SHIP ? (
                <span style={{ color: "var(--green)", fontWeight: 600 }}>✓ Free shipping unlocked!</span>
              ) : (
                <span>Add <span>£{(FREE_SHIP - cartTotal).toFixed(0)}</span> more for free shipping</span>
              )}
            </div>
            <div className="cart-progress__bar-wrap" style={{ marginTop: 6 }}>
              <div className="cart-progress__bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">🛍</div>
              <div className="cart-drawer__empty-text">Your bag is empty</div>
              <div className="cart-drawer__empty-sub">Discover our latest collection</div>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  marginTop: 12, background: "var(--nude-900)", color: "#fff",
                  border: "none", borderRadius: 8, padding: "10px 22px",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", cursor: "pointer",
                }}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={`${item.id}-${item.selectedSize}-${i}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__img" />
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__meta">
                    {item.color && `${item.color} · `}
                    {item.selectedSize ? `Size ${item.selectedSize}` : item.section || ""}
                  </div>
                  <div className="cart-item__row">
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.id, item.selectedSize, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.selectedSize, 1)}>+</button>
                    </div>
                    <div className="cart-item__price">£{(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-subtotal">
              <span className="cart-subtotal__label">Subtotal</span>
              <span className="cart-subtotal__price">£{cartTotal.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Checkout · £{cartTotal.toFixed(2)}
            </button>
            <button className="cart-view-btn" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}