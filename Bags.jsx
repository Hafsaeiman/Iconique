import { useState } from "react";
import "./Bags.css";

const bags = [
  {
    id: 1,
    name: "Sahara Tote",
    subtitle: "Structured leather everyday bag",
    price: 189,
    original: 240,
    color: "Caramel",
    badge: "SALE",
    rating: 4.8,
    reviews: 124,
    details: ["100% Genuine Leather", "Adjustable strap", "Imported", "Interior zip pocket"],
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Dune Crossbody",
    subtitle: "Minimalist chain-strap crossbody",
    price: 145,
    original: 175,
    color: "Sand",
    badge: "NEW",
    rating: 4.6,
    reviews: 89,
    details: ["Vegan leather", "Gold-tone hardware", "Magnetic closure", "Model is 5'7\""],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Maroc Backpack",
    subtitle: "Adventure-ready canvas backpack",
    price: 220,
    original: 270,
    color: "Cognac",
    badge: "SALE",
    rating: 4.9,
    reviews: 203,
    details: ["Waxed canvas", "Padded laptop sleeve", "Water-resistant", "Imported"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80",
    ],
  },
  {
    id: 4,
    name: "Oasis Clutch",
    subtitle: "Evening leather envelope clutch",
    price: 98,
    original: 120,
    color: "Nude",
    badge: null,
    rating: 4.7,
    reviews: 61,
    sizes: ["XS", "S"],
    details: ["Saffiano leather", "Detachable wrist strap", "Gold zipper", "Imported"],
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
  },
  {
    id: 5,
    name: "Atlas Shopper",
    subtitle: "Oversized woven market tote",
    price: 134,
    original: null,
    color: "Wheat",
    badge: null,
    rating: 4.5,
    reviews: 47,
    sizes: ["M", "L"],
    details: ["Natural raffia weave", "Leather handles", "Magnetic snap", "Machine washable"],
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
  },
  {
    id: 6,
    name: "Terracotta Satchel",
    subtitle: "Structured top-handle satchel",
    price: 265,
    original: 310,
    color: "Rust",
    badge: "SALE",
    rating: 4.8,
    reviews: 158,
    sizes: ["S", "M"],
    details: ["Full-grain leather", "Removable shoulder strap", "Silver hardware", "Free shipping"],
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    ],
  },
  {
    id: 7,
    name: "Kasba Mini Bag",
    subtitle: "Compact leather mini with chain",
    price: 112,
    original: 140,
    color: "Tan",
    badge: "NEW",
    rating: 4.7,
    reviews: 93,
    sizes: ["One Size"],
    details: ["Genuine leather", "Chain strap included", "Gold hardware", "Imported"],
    images: [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
  },
  {
    id: 8,
    name: "Nomad Bucket",
    subtitle: "Drawstring leather bucket bag",
    price: 178,
    original: null,
    color: "Camel",
    badge: null,
    rating: 4.6,
    reviews: 74,
    sizes: ["S", "M", "L"],
    details: ["Pebbled leather", "Drawstring closure", "Adjustable strap", "Suede interior"],
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
  },
  {
    id: 9,
    name: "Sienna Hobo",
    subtitle: "Soft slouch leather hobo",
    price: 195,
    original: 240,
    color: "Sienna",
    badge: "SALE",
    rating: 4.9,
    reviews: 211,
    sizes: ["M", "L"],
    details: ["Vegetable-tanned leather", "Zip closure", "Interior pockets", "Made in Italy"],
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
  },
];

// Additional products shown below the about strip
const moreBags = [
  // {
  //   id: 10,
  //   name: "Riviera Tote",
  //   subtitle: "Oversized vacation canvas tote",
  //   price: 159,
  //   original: 200,
  //   color: "Natural",
  //   badge: "NEW",
  //   rating: 4.7,
  //   reviews: 54,
  //   sizes: ["M", "L"],
  //   details: ["Canvas & leather trim", "Interior zipper", "Shoulder & hand carry", "Imported"],
  //   images: [
  //     "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  //     "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
  //   ],
  // },
  {
    id: 11,
    name: "Amber Flap Bag",
    subtitle: "Chic quilted flap with gold chain",
    price: 229,
    original: 280,
    color: "Amber",
    badge: "SALE",
    rating: 4.8,
    reviews: 137,
    sizes: ["One Size"],
    details: ["Quilted leather", "Gold-tone chain strap", "Magnetic flap closure", "Card slots inside"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
  },
  // {
  //   id: 12,
  //   name: "Desert Duffle",
  //   subtitle: "Weekend leather duffle bag",
  //   price: 315,
  //   original: null,
  //   color: "Cognac",
  //   badge: null,
  //   rating: 4.9,
  //   reviews: 82,
  //   sizes: ["One Size"],
  //   details: ["Full-grain leather", "Detachable shoulder strap", "Trolley sleeve", "Made in Spain"],
  //   images: [
  //     "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  //     "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80",
  //   ],
  // },
  {
    id: 13,
    name: "Pebble Saddle Bag",
    subtitle: "Vintage-inspired pebbled saddle",
    price: 142,
    original: 175,
    color: "Tan",
    badge: "SALE",
    rating: 4.6,
    reviews: 96,
    sizes: ["S", "M"],
    details: ["Pebbled leather", "Adjustable crossbody strap", "Antique brass hardware", "Imported"],
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
  },
  {
    id: 14,
    name: "Ciel Shoulder Bag",
    subtitle: "Crescent structured shoulder bag",
    price: 188,
    original: null,
    color: "Ivory",
    badge: "NEW",
    rating: 4.7,
    reviews: 61,
    sizes: ["One Size"],
    details: ["Smooth leather", "Top handle + shoulder strap", "Silver hardware", "Suede lining"],
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
  },
//   {
//     id: 15,
//     name: "Woven Raffia Tote",
//     subtitle: "Artisan hand-woven summer tote",
//     price: 118,
//     original: 145,
//     color: "Natural Straw",
//     badge: "SALE",
//     rating: 4.5,
//     reviews: 43,
//     sizes: ["M", "L"],
//     details: ["Hand-woven raffia", "Leather base trim", "Magnetic closure", "Summer collection"],
//     images: [
//       "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
//     ],
//   },
//   {
//     id: 16,
//     name: "Medina Belt Bag",
//     subtitle: "Compact hands-free belt bag",
//     price: 95,
//     original: 120,
//     color: "Sand",
//     badge: "BESTSELLER",
//     rating: 4.9,
//     reviews: 248,
//     sizes: ["S", "M", "L"],
//     details: ["Genuine leather", "Adjustable belt strap", "Two zip compartments", "Imported"],
//     images: [
//       "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80",
//       "https://images.unsplash.com/photo-1591561954555-607968c989ab?w=600&q=80",
//     ],
//   },
  {
    id: 17,
    name: "Luxe Doctor Bag",
    subtitle: "Top-handle structured doctor bag",
    price: 345,
    original: 420,
    color: "Bordeaux",
    badge: "SALE",
    rating: 4.8,
    reviews: 79,
    sizes: ["One Size"],
    details: ["Italian leather", "Brass turn-lock closure", "Interior organizer", "Made in Italy"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
  },
//   {
//     id: 18,
//     name: "Bamboo Handle Bag",
//     subtitle: "Rattan bamboo handle shopper",
//     price: 129,
//     original: null,
//     color: "Natural",
//     badge: "NEW",
//     rating: 4.6,
//     reviews: 57,
//     sizes: ["M"],
//     details: ["Canvas body", "Bamboo top handle", "Magnetic snap closure", "Lined interior"],
//     images: [
//       "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
//       "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
//     ],
  // },
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
    </div>
  );
}

function ProductModal({ bag, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    onAddToCart({ ...bag, selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-left">
          <div className="modal-main-img">
            <img src={bag.images[activeImg]} alt={bag.name} />
            {bag.badge && <span className={`badge badge-${bag.badge.toLowerCase()}`}>{bag.badge}</span>}
          </div>
          <div className="modal-thumbs">
            {bag.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={activeImg === i ? "thumb active" : "thumb"}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        </div>

        <div className="modal-right">
          <p className="modal-category">BAGS</p>
          <StarRating rating={bag.rating} />
          <p className="modal-reviews">{bag.rating} ({bag.reviews} reviews)</p>
          <h2 className="modal-name">{bag.name}</h2>

          <div className="modal-price-row">
            <span className="modal-price">£{bag.price}</span>
            {bag.original && (
              <>
                <span className="modal-original">£{bag.original}</span>
                <span className="modal-save">Save {Math.round((1 - bag.price / bag.original) * 100)}%</span>
              </>
            )}
          </div>

          <p className="modal-color">Color: <strong>{bag.color}</strong></p>
          <p className="modal-desc">{bag.subtitle} — effortlessly crafted for everyday luxury.</p>

          <div className="modal-size-section">
            <p className="modal-size-label">SIZE</p>
            <div className="modal-sizes">
              {(bag.sizes || ["S", "M", "L"]).map((s) => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? "selected" : ""}`}
                  onClick={() => { setSelectedSize(s); setSizeError(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="size-error">Please select a size</p>}
          </div>

          <div className="modal-actions">
            <div className="qty-control">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className={`add-to-cart-btn ${added ? "added" : ""}`} onClick={handleAdd}>
              {added ? "✓ ADDED" : "ADD TO CART"}
            </button>
            <button className="wishlist-btn">♡</button>
          </div>

          <div className="modal-details">
            <p className="details-heading">PRODUCT DETAILS</p>
            {bag.details.map((d, i) => (
              <p key={i} className="detail-item">✓ {d}</p>
            ))}
          </div>

          <div className="modal-shipping">
            <span>🚚 Free shipping on orders over £120</span>
            <span>↩ Free returns within 30 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BagCard({ bag, onClick }) {
  return (
    <div
      className="bag-card"
      onClick={() => onClick(bag)}
    >
      <div className="card-img-wrap">
        <img src={bag.images[0]} alt={bag.name} className="card-img" />
        <img src={bag.images[1]} alt={bag.name} className="card-img card-img-hover" />
        {bag.badge && <span className={`badge badge-${bag.badge.toLowerCase()}`}>{bag.badge}</span>}
        <div className="card-overlay">
          <button className="quick-view">Quick View</button>
        </div>
      </div>
      <div className="card-info">
        <p className="card-subtitle">{bag.subtitle}</p>
        <h3 className="card-name">{bag.name}</h3>
        <div className="card-price-row">
          <span className="card-price">£{bag.price}</span>
          {bag.original && <span className="card-original">£{bag.original}</span>}
        </div>
        <div className="card-rating">
          <StarRating rating={bag.rating} />
          <span className="card-reviews">({bag.reviews})</span>
        </div>
      </div>
    </div>
  );
}

export default function Bags() {
  const [selectedBag, setSelectedBag] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Totes", "Crossbody", "Backpacks", "Clutches"];

  const handleAddToCart = (item) => {
    setCartCount((c) => c + item.qty);
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: cartCount + item.qty, item } }));
  };

  const scrollToGrid = () => {
    document.getElementById("bag-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const openModal = (bag) => setSelectedBag(bag);

  return (
    <div className="bag-page">
      {/* Hero */}
      <section className="bag-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">ICONIQUE — COLLECTION 2025</p>
          <h1 className="hero-title">
            Online<br />
            <span className="hero-title-bold">BAG</span><br />
            <span className="hero-title-store">STORE</span>
          </h1>
          <p className="hero-sub">Curated leather goods for the modern wanderer</p>
          <button className="hero-btn" onClick={scrollToGrid}>
            Shop Now
          </button>
        </div>
        <div className="hero-number">01</div>
        <div className="hero-socials">
          <span>f</span><span>in</span><span>tw</span>
        </div>
        <div className="hero-nav-dots">
          {[0,1,2,3].map(i => <span key={i} className={i===0?"dot active":"dot"} />)}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-bar">
        <p className="filter-label">BROWSE BY</p>
        <div className="filter-pills">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-pill ${filter === c ? "active" : ""}`}
              onClick={() => { setFilter(c); scrollToGrid(); }}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="results-count">{bags.length + moreBags.length} pieces</p>
      </section>

      {/* Hottest Picks heading */}
      <section className="picks-heading">
        <h2>Hottest Picks</h2>
        <div className="picks-line" />
      </section>

      {/* Main Product Grid */}
      <section className="bag-grid" id="bag-grid">
        {bags.map((bag, i) => (
          <BagCard
            key={bag.id}
            bag={bag}
            onClick={openModal}
          />
        ))}
      </section>

      {/* About Strip */}
      <section className="about-strip">
        <div className="about-text">
          <h2>Embracing style and utility</h2>
          <p>Welcome to Iconique, where fashion and function intertwine to create a world of exquisite bags that elevate your style and enhance your everyday experiences.</p>
          <div className="about-actions">
            <button className="about-btn-outline" onClick={scrollToGrid}>SHOP THE COLLECTION</button>
            <button className="about-btn-link" onClick={scrollToGrid}>MEET THE TEAM →</button>
          </div>
        </div>
        <div className="about-img-wrap">
          <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80" alt="style" />
        </div>
      </section>

      {/* ─── MORE PRODUCTS BELOW ABOUT STRIP ─── */}
      <section className="more-section">
        <div className="more-header">
          <span className="more-tag">DISCOVER MORE</span>
          <h2 className="more-title">New Arrivals & Favourites</h2>
          <p className="more-sub">Expand your collection with our latest additions</p>
        </div>
        <div className="bag-grid more-grid">
          {moreBags.map((bag) => (
            <BagCard key={bag.id} bag={bag} onClick={openModal} />
          ))}
        </div>
      </section>

      {/* Newsletter strip */}
     

      {/* Modal */}
      {selectedBag && (
        <ProductModal
          bag={selectedBag}
          onClose={() => setSelectedBag(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}