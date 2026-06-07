import { useState } from "react";
import "./Jewelry.css";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
// import { useProducts } from "../hooks/useProducts";

// ─── DATA ────────────────────────────────────────────────────────────────────
const products = [
  {
    id: "j1",
    name: "Sparkling Crystal Earrings",
    price: 129,
    originalPrice: null,
    category: "Earrings",
    badge: null,
    rating: 4.7,
    reviews: 98,
    color: "Gold",
    description: "Handcrafted crystal drop earrings with 18k gold plating.",
    details: ["18k Gold Plated", "Hypoallergenic", "Imported", "Model wears size One Size"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
      "https://images.unsplash.com/photo-1630017091980-9e0e7e8f1b11?w=400&q=80",
    ],
  },
  {
    id: "j2",
    name: "Gold Teardrop Pendant",
    price: 169,
    originalPrice: 210,
    category: "Necklaces",
    badge: "SALE",
    rating: 4.9,
    reviews: 124,
    color: "Gold",
    description: "Effortlessly elegant teardrop pendant crafted from pure gold vermeil.",
    details: ["Gold Vermeil", "Adjustable Chain", "Imported", "Model is 5'7\""],
    sizes: null,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    ],
  },
  {
    id: "j3",
    name: "Elegant Pearl Bracelet",
    price: 98,
    originalPrice: null,
    category: "Bracelets",
    badge: "NEW",
    rating: 4.6,
    reviews: 57,
    color: "Pearl White",
    description: "Lustrous freshwater pearl bracelet on a gold-fill chain.",
    details: ["Freshwater Pearls", "Gold-Fill Chain", "Imported", "One Size Fits Most"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    ],
  },
  {
    id: "j4",
    name: "Diamond Solitaire Ring",
    price: 599,
    originalPrice: 750,
    category: "Rings",
    badge: "SALE",
    rating: 5.0,
    reviews: 43,
    color: "Rose Gold",
    description: "Timeless diamond solitaire set in 14k rose gold. A forever piece.",
    details: ["14k Rose Gold", "0.5ct Diamond", "Conflict Free", "Hallmarked"],
    sizes: ["5", "6", "7", "8", "9"],
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80",
    ],
  },
  {
    id: "j5",
    name: "Celestial Charm Necklace",
    price: 145,
    originalPrice: null,
    category: "Necklaces",
    badge: null,
    rating: 4.8,
    reviews: 76,
    color: "Silver",
    description: "Delicate celestial charm necklace with moon and star pendants.",
    details: ["Sterling Silver", "Lobster Clasp", "Imported", '16" + 2" Extender'],
    sizes: null,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1631982690223-8aa4cfab5f4d?w=400&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
    ],
  },
  {
    id: "j6",
    name: "Twisted Gold Bangle",
    price: 89,
    originalPrice: 110,
    category: "Bracelets",
    badge: "SALE",
    rating: 4.5,
    reviews: 31,
    color: "Gold",
    description: "Sculptural twisted gold bangle — effortless stacking piece.",
    details: ["Gold Plated Brass", "Hypoallergenic", "Imported", "One Size"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1573408301185-9519f94d2f93?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1573408301185-9519f94d2f93?w=400&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    ],
  },
  {
    id: "j7",
    name: "Pavé Hoop Earrings",
    price: 215,
    originalPrice: null,
    category: "Earrings",
    badge: "BESTSELLER",
    rating: 4.9,
    reviews: 203,
    color: "Gold",
    description: "Sparkling pavé diamond hoops — day to night in an instant.",
    details: ["14k Gold", "Pavé Diamonds", "Conflict Free", "Push-Back Closure"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=400&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    ],
  },
  {
    id: "j8",
    name: "Emerald Statement Ring",
    price: 389,
    originalPrice: 480,
    category: "Rings",
    badge: "SALE",
    rating: 4.7,
    reviews: 62,
    color: "Emerald Green",
    description: "Bold oval emerald set in a vintage-inspired gold setting.",
    details: ["14k Gold", "Natural Emerald", "Conflict Free", "Sizes 5–9"],
    sizes: ["5", "6", "7", "8", "9"],
    image: "https://images.unsplash.com/photo-1586495777744-4e6232bf4a5b?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1586495777744-4e6232bf4a5b?w=400&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    ],
  },
  {
    id: "j9",
    name: "Layered Chain Necklace",
    price: 119,
    originalPrice: 150,
    category: "Necklaces",
    badge: "SALE",
    rating: 4.6,
    reviews: 88,
    color: "Gold",
    description: "Multi-strand layered chain necklace for effortless elegance.",
    details: ["Gold Vermeil", "Multi-layered design", "Lobster clasp", '16–20" adjustable'],
    sizes: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    ],
  },
  {
    id: "j10",
    name: "Rose Gold Stud Earrings",
    price: 79,
    originalPrice: null,
    category: "Earrings",
    badge: "NEW",
    rating: 4.8,
    reviews: 115,
    color: "Rose Gold",
    description: "Minimalist rose gold studs — perfect for everyday wear.",
    details: ["14k Rose Gold", "Hypoallergenic posts", "Imported", "0.3ct total weight"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1630017091980-9e0e7e8f1b11?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1630017091980-9e0e7e8f1b11?w=400&q=80",
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=400&q=80",
    ],
  },
  {
    id: "j11",
    name: "Sapphire Tennis Bracelet",
    price: 445,
    originalPrice: 560,
    category: "Bracelets",
    badge: "SALE",
    rating: 4.9,
    reviews: 67,
    color: "Sapphire Blue",
    description: "Stunning sapphire and diamond tennis bracelet in white gold.",
    details: ["18k White Gold", "Natural Sapphires", "Diamond accents", "Conflict Free"],
    sizes: null,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    ],
  },
  {
    id: "j12",
    name: "Vintage Pearl Ring",
    price: 265,
    originalPrice: null,
    category: "Rings",
    badge: "BESTSELLER",
    rating: 4.8,
    reviews: 142,
    color: "Pearl White",
    description: "Art-deco inspired pearl ring with diamond halo in yellow gold.",
    details: ["14k Yellow Gold", "Freshwater Pearl", "Diamond halo", "Hallmarked"],
    sizes: ["5", "6", "7", "8"],
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80",
    thumbs: [
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    ],
  },
];

const collections = [
  { name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80" },
  { name: "Earrings",  image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" },
  { name: "Rings",     image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { setCartOpen } = useDrawer();
  const isWished = isWishlisted(product.id);

  const savePercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(
      { ...product, selectedSize: selectedSize ?? "One Size", section: "jewelry" },
      qty
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setCartOpen(true);
    }, 1400);
  };

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-body">

          {/* ── LEFT: Images ───────────────────────────── */}
          <div className="modal-images">

            {/* Main image */}
            <div className="modal-main-img">
              {product.badge && (
                <span className={`badge badge-${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
              <img
                src={product.thumbs[activeThumb]}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = product.image;
                }}
              />
              {/* Heart overlay */}
              <button
                className={`modal-wish-overlay ${isWished ? "wished" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isWished ? "Remove from wishlist" : "Save to wishlist"}
              >
                {isWished ? "♥" : "♡"}
              </button>
            </div>

            {/* Thumbnails */}
            <div className="modal-thumbs">
              {product.thumbs.map((t, i) => (
                <button
                  key={i}
                  className={`thumb-btn ${activeThumb === i ? "active" : ""}`}
                  onClick={() => setActiveThumb(i)}
                >
                  <img
                    src={t}
                    alt={`View ${i + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = product.image;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info ────────────────────────────── */}
          <div className="modal-info">
            <div className="modal-info-scroll">

              {/* Category + rating */}
              <p className="modal-category">{product.category}</p>
              <div className="modal-rating-row">
                <StarRating rating={product.rating} />
                <span className="modal-reviews">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>

              {/* Title */}
              <h2 className="modal-title">{product.name}</h2>

              {/* Price */}
              <div className="modal-price-row">
                <span className="modal-price">£{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="modal-original">£{product.originalPrice}</span>
                    <span className="modal-save">Save {savePercent}%</span>
                  </>
                )}
              </div>

              {/* Color */}
              <p className="modal-color">
                Color: <strong>{product.color}</strong>
              </p>

              {/* Description */}
              <p className="modal-desc">{product.description}</p>

              {/* Sizes */}
              {product.sizes && (
                <div className="modal-sizes">
                  <p className="size-label">Ring Size</p>
                  <div className="size-options">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        className={`size-btn ${selectedSize === s ? "active" : ""}`}
                        onClick={() => {
                          setSelectedSize(s);
                          setSizeError(false);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="size-error">Please select a size to continue</p>
                  )}
                </div>
              )}

              {/* Qty + Add to Bag */}
              <div className="modal-actions">
                <div className="qty-control">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button
                  className={`add-btn ${added ? "added" : ""}`}
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <span className="add-btn__icon">✓</span>
                      Added to Bag
                    </>
                  ) : (
                    <>
                      <span className="add-btn__icon">🛍</span>
                      Add to Bag
                    </>
                  )}
                </button>
              </div>

              {/* Product details */}
              <div className="modal-details">
                <p className="details-title">Product Details</p>
                {product.details.map((d, i) => (
                  <p key={i} className="detail-item">
                    <span className="detail-check">✓</span>
                    {d}
                  </p>
                ))}
              </div>

              {/* Perks */}
              <div className="modal-perks">
                <div className="perk-item">
                  <span className="perk-icon">🚚</span>
                  <span>Free shipping on orders over £120</span>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">↩</span>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">🔒</span>
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Necklaces", "Bracelets", "Earrings", "Rings"];

export default function Jewelry() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const scrollToProducts = () => {
    document.getElementById("jewelry-products-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="jewelry-page">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Collection 2026</p>
          <h1>
            Elegant Jewelry
            <br />
            <em>Craftsmanship</em>
          </h1>
          <p className="hero-sub">
            Discover exquisite handcrafted jewelry for every occasion.
          </p>
          <button className="hero-btn" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>
        <div className="hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=700&q=80"
            alt="Jewelry hero"
          />
          <div className="hero-blur" />
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────── */}
      <section className="section best-sellers" id="jewelry-products-section">
        <div className="section-header">
          <span className="section-tag">Curated for You</span>
          <h2>Best Sellers</h2>
        </div>

        {/* Category filter */}
        <div className="category-filter">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="product-grid">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="card-img-wrap">
                {product.badge && (
                  <span className={`badge badge-${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80";
                  }}
                />
                <div className="card-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>
              <div className="card-info">
                <p className="card-category">{product.category}</p>
                <h3 className="card-name">{product.name}</h3>
                <div className="card-rating">
                  <StarRating rating={product.rating} />
                  <span>({product.reviews})</span>
                </div>
                <div className="card-price-row">
                  <span className="card-price">£{product.price}</span>
                  {product.originalPrice && (
                    <span className="card-original">£{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY COLLECTION ───────────────────────── */}
      <section className="section collections-section">
        <div className="section-header">
          <span className="section-tag">Browse</span>
          <h2>Shop by Collection</h2>
        </div>
        <div className="collections-grid">
          {collections.map((col) => (
            <div
              key={col.name}
              className="collection-card"
              onClick={() => {
                setActiveCategory(col.name);
                scrollToProducts();
              }}
            >
              <img src={col.image} alt={col.name} />
              <div className="collection-overlay">
                <span>{col.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANNER ───────────────────────────────────── */}
      <section className="banner-section">
        <div className="banner-text">
          <h2>Adorn Yourself in Beauty</h2>
          <p>Luxury jewelry to elevate and celebrate every special moment.</p>
          <button className="hero-btn dark" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>
        <div className="banner-img">
          <img
            src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80"
            alt="Luxury rings"
          />
        </div>
      </section>

      {/* ── MODAL ────────────────────────────────────── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}