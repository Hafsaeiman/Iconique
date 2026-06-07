import { useWishlist } from "../context/ShopContext";
import { useCart } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { setWishlistOpen, setCartOpen } = useDrawer();

  const handleMoveToCart = (product) => {
    addToCart({ ...product, selectedSize: "M" }, 1);
    toggleWishlist(product);
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setWishlistOpen(false)} />
      <div className="cart-drawer wishlist-drawer">
        {/* Header */}
        <div className="cart-drawer__head">
          <div>
            <div className="cart-drawer__title">My Wishlist</div>
            <div className="cart-drawer__count">
              {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
            </div>
          </div>
          <button className="cart-drawer__close" onClick={() => setWishlistOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer__body">
          {wishlist.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">🤍</div>
              <div className="cart-drawer__empty-text">No saved items yet</div>
              <div className="cart-drawer__empty-sub">
                Tap the heart icon on any product to save it here
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
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
            wishlist.map((item) => (
              <div key={item.id} className="cart-item wishlist-item">
                <img src={item.image} alt={item.name} className="cart-item__img" />
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__meta">{item.color} · {item.category}</div>
                  <div className="cart-item__price" style={{ marginTop: 6 }}>
                    £{item.price}
                    {item.badge && (
                      <span
                        style={{
                          marginLeft: 8, fontSize: 9, fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 6px", borderRadius: 2,
                          background: item.badge === "Sale" ? "var(--red)" : "var(--nude-800)",
                          color: "#fff",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button
                      className="wishlist-move-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Bag
                    </button>
                    <button
                      className="cart-item__remove"
                      onClick={() => toggleWishlist(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — move all to cart */}
        {wishlist.length > 0 && (
          <div className="cart-drawer__foot">
            <button
              className="cart-checkout-btn"
              onClick={() => {
                wishlist.forEach(p =>
                  addToCart({ ...p, selectedSize: "M" }, 1)
                );
                // clear wishlist
                wishlist.forEach(p => toggleWishlist(p));
                setWishlistOpen(false);
                setCartOpen(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Move All to Bag
            </button>
            <button
              className="cart-view-btn"
              onClick={() => setWishlistOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}