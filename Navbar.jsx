import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
import { PRODUCTS } from "../context/ShopContext";
import './Navbar.css';

/* ─── NAVBAR ─── */
export default function Navbar() {
  const { cart, setCart, addToCart, cartCount } = useCart();
  const { wishlist, wishCount } = useWishlist();
  const { setCartOpen, setWishlistOpen } = useDrawer();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q)
    ).slice(0, 7);
  }, [query]);

  const addToCartFromSearch = (product) => {
    addToCart({ ...product, selectedSize: "M" }, 1);
    setQuery("");
    setSearchOpen(false);
    setCartOpen(true);
  };

  return (
    <nav className={`nb${scrolled ? " nb--scrolled" : ""}`}>
      <div className="nb__inner">
        {/* Logo */}
        <Link to="/" className="nb__logo">
          <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
            <ellipse cx="22" cy="22" rx="20" ry="20" stroke="#fff" strokeWidth="1.4"/>
            <path d="M14 22 Q22 10 30 22 Q22 34 14 22Z" fill="#fff" opacity="0.25"/>
            <path d="M14 22 Q22 10 30 22 Q22 34 14 22Z" stroke="#fff" strokeWidth="1.4" fill="none"/>
            <circle cx="22" cy="22" r="2.5" fill="#fff"/>
          </svg>
          ICONIQUE
        </Link>

        {/* Center nav */}
        <nav className="nb__nav">
          <Link to="/"       className="nb__nav-link">Home</Link>
          <Link to="/women"  className="nb__nav-link">Women</Link>
          <Link to="/men"    className="nb__nav-link">Men</Link>
          <Link to="/kids"   className="nb__nav-link">Kids</Link>
          {/* <Link to="/bags"   className="nb__nav-link">Bags</Link>
          <Link to="/shoes"  className="nb__nav-link">Shoes</Link>
          <Link to="/jewelry" className="nb__nav-link">Jewelry</Link> */}
        </nav>

        {/* Right actions */}
        <div className="nb__actions">

          {/* Search */}
          <div className="nb__search-wrap" ref={searchRef}>
            <button className="nb__icon-btn" onClick={() => setSearchOpen(o => !o)} title="Search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <div className={`nb__search-expand${searchOpen ? " nb__search-expand--open" : " nb__search-expand--closed"}`}>
              <input
                ref={inputRef}
                className="nb__search-input"
                placeholder="Search…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button className="nb__search-clear" onClick={() => setQuery("")}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Search results dropdown */}
            {searchOpen && query.length >= 2 && (
              <div className="nb__results">
                <div className="nb__results-header">
                  {results.length > 0 ? `${results.length} results` : "No results"}
                </div>
                {results.length > 0 ? (
                  results.map(p => (
                    <div
                      key={p.id}
                      className="nb__result-item"
                      onClick={() => addToCartFromSearch(p)}
                    >
                      <img src={p.image} alt={p.name} className="nb__result-img" />
                      <div className="nb__result-info">
                        <div className="nb__result-name">{p.name}</div>
                        <div className="nb__result-cat">{p.category} · {p.color}</div>
                        {p.badge && (
                          <span className={`nb__result-badge nb__result-badge--${p.badge.toLowerCase()}`}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="nb__result-price">£{p.price}</div>
                    </div>
                  ))
                ) : (
                  <div className="nb__results-empty">
                    No results for "<em>{query}</em>"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist icon */}
          <button
            className="nb__icon-btn"
            title="Favourites"
            onClick={() => setWishlistOpen(true)}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishCount > 0 && <span className="nb__badge">{wishCount}</span>}
          </button>

          {/* Cart icon */}
          <button
            className="nb__icon-btn"
            onClick={() => setCartOpen(true)}
            title="Cart"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className="nb__badge">{cartCount}</span>}
          </button>

          {/* Login / User */}
          {user ? (
            <button
              className="nb__login-btn nb__login-btn--user"
              onClick={() => { localStorage.removeItem("user"); setUser(null); }}
            >
              {user.firstName} · Logout
            </button>
          ) : (
            <Link to="/login" className="nb__login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}