import { useState } from "react";
import "./Shoes.css";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
const AirJordan1 = "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=500&q=80";

const shoesData = [
  { id:"s1",  name:"Nike Air Max Pulse",      brand:"Nike",        price:152.99, originalPrice:189.99, rating:4.8, reviews:214, category:"Basketball",  tag:"NEW",         colors:["#c8b8a2","#2c2c2c","#d4a574"], sizes:[38,39,40,41,42,43,44], description:"Lightweight mesh upper with Air cushioning for all-day comfort.",                     image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",  gallery:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80"] },
  { id:"s2",  name:"Adidas Ultraboost 24",    brand:"Adidas",      price:189.99, originalPrice:null,   rating:4.9, reviews:389, category:"Running",     tag:"BEST SELLER", colors:["#e8ddd0","#8b7355","#1a1a1a"], sizes:[37,38,39,40,41,42,43], description:"Responsive Boost midsole returns energy with every stride.",                          image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", gallery:["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80","https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80"] },
  { id:"s3",  name:"Air Jordan 12 Retro",     brand:"Jordan",      price:210.0,  originalPrice:260.0,  rating:4.7, reviews:512, category:"Air Jordans", tag:"SALE",        colors:["#f5f0e8","#c8a882","#2c2c2c"], sizes:[39,40,41,42,43,44,45], description:"Iconic silhouette with full-length Air sole unit. A legend reborn.",                 image:AirJordan1, gallery:[AirJordan1, AirJordan1] },
  { id:"s4",  name:"Puma Velocity Nitro",     brand:"Puma",        price:129.99, originalPrice:null,   rating:4.6, reviews:178, category:"Football",    tag:null,          colors:["#c4a882","#6b5c4e","#e8e0d5"], sizes:[38,39,40,41,42,43], description:"NITRO foam midsole delivers ultra-lightweight cushioning and speed.",                 image:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80", gallery:["https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80","https://images.unsplash.com/photo-1556906781-9a412961a28b?w=500&q=80"] },
  { id:"s5",  name:"New Balance 990v6",       brand:"New Balance", price:174.99, originalPrice:210.0,  rating:4.8, reviews:293, category:"Golf",        tag:"SALE",        colors:["#d4c5b0","#8c7b6e","#f0ebe3"], sizes:[40,41,42,43,44,45], description:"Made in USA with premium suede and mesh upper for heritage style.",                  image:"https://images.unsplash.com/photo-1562183241-840b8af0721e?w=500&q=80",  gallery:["https://images.unsplash.com/photo-1562183241-840b8af0721e?w=500&q=80","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80"] },
  { id:"s6",  name:"Reebok Club C 85",        brand:"Reebok",      price:89.99,  originalPrice:null,   rating:4.5, reviews:445, category:"Basketball",  tag:null,          colors:["#f5f0e8","#c8b8a2","#2c2c2c"], sizes:[37,38,39,40,41,42], description:"Classic court silhouette with soft leather upper and gum outsole.",                  image:"https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&q=80", gallery:["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&q=80","https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80"] },
  { id:"s7",  name:"Converse Chuck 70",       brand:"Converse",    price:95.0,   originalPrice:null,   rating:4.7, reviews:621, category:"Running",     tag:"NEW",         colors:["#e8ddd0","#3d3028","#c8a882"], sizes:[36,37,38,39,40,41,42], description:"Premium canvas with vintage-inspired details and OrthoLite insole.",                image:"https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=500&q=80", gallery:["https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=500&q=80","https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&q=80"] },
  { id:"s8",  name:"Vans Old Skool Pro",      brand:"Vans",        price:114.99, originalPrice:139.99, rating:4.6, reviews:334, category:"Air Jordans", tag:"SALE",        colors:["#2c2c2c","#c8b8a2","#8b7355"], sizes:[38,39,40,41,42,43,44], description:"Waffle outsole with UltraCush HD insole for superior board feel.",                  image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80", gallery:["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80","https://images.unsplash.com/photo-1547288077-1f79b08a77f4?w=500&q=80"] },
  { id:"s9",  name:"Nike React Infinity",     brand:"Nike",        price:159.99, originalPrice:195.0,  rating:4.7, reviews:267, category:"Running",     tag:"SALE",        colors:["#f0ebe3","#c8956c","#1a1a1a"], sizes:[38,39,40,41,42,43,44], description:"Wide platform with React foam for a smooth, cushioned run.",                        image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80", gallery:["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"] },
  { id:"s10", name:"Adidas Forum Low",        brand:"Adidas",      price:99.99,  originalPrice:null,   rating:4.5, reviews:189, category:"Basketball",  tag:"NEW",         colors:["#f5f0e8","#8b7355","#2c2c2c"], sizes:[37,38,39,40,41,42,43], description:"Court heritage meets street style in this iconic low-top silhouette.",               image:"https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80", gallery:["https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80"] },
  { id:"s11", name:"Salomon XT-6",            brand:"Salomon",     price:219.99, originalPrice:260.0,  rating:4.9, reviews:143, category:"Golf",        tag:"SALE",        colors:["#c4a882","#3d3028","#d4c5b0"], sizes:[39,40,41,42,43,44], description:"Trail-to-street legend with Contagrip outsole and Sensifit system.",                 image:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80", gallery:["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80","https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80"] },
  { id:"s12", name:"Jordan 1 Mid SE",         brand:"Jordan",      price:134.99, originalPrice:null,   rating:4.8, reviews:402, category:"Air Jordans", tag:"BEST SELLER", colors:["#c8a882","#2c2c2c","#f5f0e8"], sizes:[38,39,40,41,42,43,44,45], description:"Premium leather upper with Nike Air cushioning and classic ankle collar.", image:AirJordan1, gallery:[AirJordan1, AirJordan1] },
];

const categories = ["All","Basketball","Air Jordans","Football","Golf","Running"];

export default function Shoes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [modalSize, setModalSize] = useState(null);
  const [modalColor, setModalColor] = useState(0);
  const [modalQty, setModalQty] = useState(1);
  const [modalImg, setModalImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { setCartOpen } = useDrawer();

  const filtered = selectedCategory === "All"
    ? shoesData
    : shoesData.filter(s => s.category === selectedCategory);

  const openModal = (shoe) => {
    setSelectedShoe(shoe);
    setModalSize(null);
    setModalColor(0);
    setModalQty(1);
    setModalImg(0);
  };

  const closeModal = () => setSelectedShoe(null);

  const handleAddToCart = (shoe, size, qty, colorIdx) => {
    if (!size) return;
    addToCart({
      ...shoe,
      // normalize: cart expects price, name, image, selectedSize
      image: shoe.gallery[0],
      selectedSize: String(size),
      colorIdx,
      section: "shoes",
    }, qty);
    setAddedToCart(shoe.id);
    setTimeout(() => { setAddedToCart(null); closeModal(); setCartOpen(true); }, 1400);
  };

  const scrollToGrid = () => {
    document.getElementById("shoes-grid-section")?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <div className="shoes-page">
      {/* HERO */}
      <section className="shoes-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Summer Collection 2026</p>
          <h1 className="hero-title">New<br/>Summer<br/><em>Item.</em></h1>
          <p className="hero-desc">Discover our curated selection of premium footwear — where craftsmanship meets contemporary style.</p>
          <div className="hero-btns">
            <button className="hero-shop-btn" onClick={scrollToGrid}>SHOP NOW</button>
            <button className="hero-more-btn" onClick={scrollToGrid}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob"></div>
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" alt="Featured shoe" className="hero-shoe-img" />
          <div className="hero-badge">
            <span className="hero-badge-num">21%</span>
            <span className="hero-badge-text">OFF</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="shoes-categories-section">
        <div className="section-header">
          <h2>Shop by Categories</h2>
          <button className="see-all-btn" onClick={scrollToGrid}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
        <div className="categories-row">
          {categories.map(cat => (
            <button key={cat} className={`cat-pill ${selectedCategory === cat ? "active" : ""}`} onClick={() => { setSelectedCategory(cat); scrollToGrid(); }}>
              <div className="cat-circle">
                <img
                  src={
                    cat === "All" ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=70"
                    : cat === "Basketball" ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=70"
                    : cat === "Air Jordans" ? "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=120&q=70"
                    : cat === "Football" ? "https://images.unsplash.com/photo-1539185441755-769473a23570?w=120&q=70"
                    : cat === "Golf" ? "https://images.unsplash.com/photo-1562183241-840b8af0721e?w=120&q=70"
                    : "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&q=70"
                  }
                  alt={cat}
                />
              </div>
              <span>{cat.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="shoes-arrivals-section" id="shoes-grid-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2>New Arrivals</h2>
            <span className="section-sub">Our newly launched shoes collection.</span>
          </div>
        </div>
        <div className="shoes-grid">
          {filtered.map(shoe => {
            const isWished = isWishlisted(shoe.id);
            return (
              <div key={shoe.id} className={`shoe-card ${addedToCart === shoe.id ? "added" : ""}`}>
                {shoe.tag && <span className={`shoe-tag tag-${shoe.tag.replace(" ", "-").toLowerCase()}`}>{shoe.tag}</span>}
                <button className={`wish-btn ${isWished ? "wished" : ""}`} onClick={() => toggleWishlist({ ...shoe, image: shoe.gallery[0], selectedSize: "—" })}>
                  <svg viewBox="0 0 24 24" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
                <div className="shoe-img-wrap" onClick={() => openModal(shoe)}>
                  <img src={shoe.image} alt={shoe.name} className="shoe-img" />
                </div>
                <div className="shoe-info">
                  <p className="shoe-brand">{shoe.brand}</p>
                  <h3 className="shoe-name" onClick={() => openModal(shoe)}>{shoe.name}</h3>
                  <div className="shoe-stars">
                    {[...Array(5)].map((_,i) => (
                      <span key={i} className={i < Math.floor(shoe.rating) ? "star filled" : "star"}>★</span>
                    ))}
                    <span className="shoe-review-count">({shoe.reviews})</span>
                  </div>
                  <div className="shoe-price-row">
                    <span className="shoe-price">£{shoe.price.toFixed(2)}</span>
                    {shoe.originalPrice && <span className="shoe-orig-price">£{shoe.originalPrice.toFixed(2)}</span>}
                  </div>
                  <button className="shoe-cart-btn" onClick={() => openModal(shoe)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL */}
      {selectedShoe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-left">
              <div className="modal-main-img">
                <img src={selectedShoe.gallery[modalImg]} alt={selectedShoe.name} />
                {selectedShoe.tag && <span className={`shoe-tag tag-${selectedShoe.tag.replace(" ","-").toLowerCase()}`}>{selectedShoe.tag}</span>}
              </div>
              <div className="modal-thumbs">
                {selectedShoe.gallery.map((g, i) => (
                  <button key={i} className={`modal-thumb ${modalImg === i ? "active" : ""}`} onClick={() => setModalImg(i)}>
                    <img src={g} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-right">
              <p className="modal-category">{selectedShoe.category.toUpperCase()}</p>
              <div className="modal-stars">
                {[...Array(5)].map((_,i) => (
                  <span key={i} className={i < Math.floor(selectedShoe.rating) ? "star filled" : "star"}>★</span>
                ))}
                <span className="modal-review">{selectedShoe.rating} ({selectedShoe.reviews} reviews)</span>
              </div>
              <h2 className="modal-name">{selectedShoe.name}</h2>
              <div className="modal-price-row">
                <span className="modal-price">£{selectedShoe.price.toFixed(2)}</span>
                {selectedShoe.originalPrice && (
                  <><span className="modal-orig">£{selectedShoe.originalPrice.toFixed(2)}</span><span className="modal-save">Save {Math.round((1-selectedShoe.price/selectedShoe.originalPrice)*100)}%</span></>
                )}
              </div>
              <p className="modal-brand-label">Brand: <b>{selectedShoe.brand}</b></p>
              <p className="modal-desc">{selectedShoe.description}</p>
              <div className="modal-colors">
                {selectedShoe.colors.map((c, i) => (
                  <button key={i} className={`color-dot ${modalColor === i ? "active" : ""}`} style={{ background:c }} onClick={() => setModalColor(i)} />
                ))}
              </div>
              <p className="modal-label">SIZE</p>
              <div className="modal-sizes">
                {selectedShoe.sizes.map(s => (
                  <button key={s} className={`size-btn ${modalSize === s ? "active" : ""}`} onClick={() => setModalSize(s)}>{s}</button>
                ))}
              </div>
              {!modalSize && <p className="modal-size-hint">Please select a size</p>}
              <div className="modal-qty-row">
                <div className="modal-qty">
                  <button onClick={() => setModalQty(q => Math.max(1, q-1))}>−</button>
                  <span>{modalQty}</span>
                  <button onClick={() => setModalQty(q => q+1)}>+</button>
                </div>
                <button
                  className={`modal-add-btn ${addedToCart === selectedShoe.id ? "added" : ""}`}
                  onClick={() => handleAddToCart(selectedShoe, modalSize, modalQty, modalColor)}
                  disabled={!modalSize}
                >
                  {addedToCart === selectedShoe.id ? "✓ ADDED" : "ADD TO CART"}
                </button>
                <button
                  className={`modal-wish-btn ${isWishlisted(selectedShoe.id) ? "wished" : ""}`}
                  onClick={() => toggleWishlist({ ...selectedShoe, image: selectedShoe.gallery[0], selectedSize: "—" })}
                >
                  <svg viewBox="0 0 24 24" fill={isWishlisted(selectedShoe.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
              </div>
              <div className="modal-details">
                <p className="modal-label">PRODUCT DETAILS</p>
                <ul>
                  <li>✓ Premium quality materials</li>
                  <li>✓ Imported</li>
                  <li>✓ Available in multiple colorways</li>
                  <li>✓ Model is 5'11"</li>
                </ul>
              </div>
              <div className="modal-shipping">
                <span>🚚 Free shipping on orders over £120</span>
                <span>↩ Free returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}