import { useState, useEffect, useMemo, useRef } from "react";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
import "./Men.css";

/* ─── HERO SLIDES DATA ─── */
const MEN_HERO_SLIDES = [
  { img:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1800&q=85", eyebrow:"SS 2025 Collection", title:"Sharp.\nRefined.\nPresent.", sub:"Elevated menswear for the man who means business — and leisure.", cta:"Shop All Men's", cta2:"New Arrivals", category:"All" },
  { img:"https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1800&q=85", eyebrow:"Men's Outerwear", title:"Layer Up\nin Style.", sub:"Statement jackets and coats built for every season.", cta:"Shop Outerwear", cta2:null, category:"Jackets" },
  { img:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1800&q=85", eyebrow:"Work & Weekend", title:"Dress for\nEvery Chapter.", sub:"From the boardroom to the weekend — curated menswear.", cta:"Shop Shirts", cta2:null, category:"Shirts" },
];

const MEN_PRODUCTS = [
  { id:"m1",  name:"Oxford Button-Down Shirt",    category:"Shirts",     collection:"Work Wear", price:89,  originalPrice:null, badge:"New",  color:"Sky Blue",   sizes:["XS","S","M","L","XL","XXL"], rating:4.8, reviews:234, details:["100% Cotton Oxford","Machine wash","Regular fit","Button-down collar"], image:"https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80" },
  { id:"m2",  name:"Slim Chino Trousers",         category:"Trousers",   collection:"Work Wear", price:72,  originalPrice:90,   badge:"Sale", color:"Warm Sand",  sizes:["28","30","32","34","36","38"], rating:4.6, reviews:187, details:["97% Cotton 3% Elastane","Machine wash","Slim fit","Belt loops"], image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
  { id:"m3",  name:"Merino Crew Neck Knit",       category:"Knitwear",   collection:"Weekend",   price:115, originalPrice:145,  badge:"Sale", color:"Deep Navy",  sizes:["XS","S","M","L","XL"], rating:4.9, reviews:312, details:["100% Merino Wool","Hand wash cold","Regular fit","Ribbed cuffs"], image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80" },
  { id:"m4",  name:"Classic White Polo",          category:"T-Shirts",   collection:"Summer",    price:55,  originalPrice:null, badge:"New",  color:"White",      sizes:["XS","S","M","L","XL","XXL"], rating:4.5, reviews:421, details:["100% Cotton Piqué","Machine wash","Regular fit","2-button placket"], image:"https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80" },
  { id:"m5",  name:"Selvedge Straight Jeans",     category:"Jeans",      collection:"Weekend",   price:138, originalPrice:170,  badge:"Sale", color:"Indigo",     sizes:["28","30","32","34","36"], rating:4.7, reviews:98,  details:["100% Selvedge Denim","Machine wash cold","Straight fit","Coin pocket"], image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80" },
  { id:"m6",  name:"Suede Chelsea Boot",          category:"Shoes",      collection:"Work Wear", price:195, originalPrice:null, badge:"New",  color:"Tan",        sizes:["6","7","8","9","10","11","12"], rating:4.8, reviews:156, details:["Genuine suede upper","Leather lining","Elastic gussets","Leather sole"], image:"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80" },
  { id:"m7",  name:"Linen Relaxed Shorts",        category:"Shorts",     collection:"Summer",    price:48,  originalPrice:60,   badge:"Sale", color:"Stone",      sizes:["XS","S","M","L","XL"], rating:4.5, reviews:203, details:["100% Linen","Machine wash","Relaxed fit","Elasticated waist"], image:"https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80" },
  { id:"m8",  name:"Wool Overcoat",               category:"Jackets",    collection:"New In",    price:285, originalPrice:360,  badge:"Sale", color:"Charcoal",   sizes:["XS","S","M","L","XL"], rating:4.9, reviews:87,  details:["80% Wool 20% Poly","Dry clean only","Relaxed fit","Fully lined"], image:"https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:"m9",  name:"Compression Running Tee",     category:"Activewear", collection:"Weekend",   price:42,  originalPrice:null, badge:"New",  color:"Electric Blue",sizes:["XS","S","M","L","XL"], rating:4.6, reviews:311, details:["88% Polyester 12% Elastane","Machine wash","Compression fit","Moisture-wicking"], image:"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80" },
  { id:"m10", name:"Leather Bifold Wallet",       category:"Accessories",collection:"New In",    price:58,  originalPrice:null, badge:"New",  color:"Black",      sizes:["One Size"], rating:4.7, reviews:442, details:["Genuine leather","8 card slots","Note compartment","RFID blocking"], image:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80", hoverImage:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
];

const MEN_TABS = [
  { label:"All", category:"All" },
  { label:"T-Shirts", category:"T-Shirts" },
  { label:"Shirts", category:"Shirts" },
  { label:"Knitwear", category:"Knitwear" },
  { label:"Trousers", category:"Trousers" },
  { label:"Jeans", category:"Jeans" },
  { label:"Shorts", category:"Shorts" },
  { label:"Jackets", category:"Jackets" },
  { label:"Activewear", category:"Activewear" },
  { label:"Shoes", category:"Shoes" },
  { label:"Accessories", category:"Accessories" },
  { label:"Swimwear", category:"Swimwear" },
];

const MEN_SIDEBAR = {
  "Collections": [
    { label:"New In", category:"New In" },
    { label:"Summer Edit", category:"Summer" },
    { label:"Work Wear", category:"Work Wear" },
    { label:"Weekend Vibes", category:"Weekend" },
  ],
  "Shop by Category": [
    { label:"View All", category:"All" },
    { label:"T-Shirts & Polos", category:"T-Shirts" },
    { label:"Shirts", category:"Shirts" },
    { label:"Knitwear", category:"Knitwear" },
    { label:"Trousers", category:"Trousers" },
    { label:"Jeans & Denim", category:"Jeans" },
    { label:"Shorts", category:"Shorts" },
    { label:"Jackets & Coats", category:"Jackets" },
    { label:"Activewear", category:"Activewear" },
    { label:"Shoes", category:"Shoes" },
    { label:"Accessories", category:"Accessories" },
    { label:"Swimwear", category:"Swimwear" },
  ],
};

const SORT_OPTIONS = [
  { value:"featured", label:"Featured" },
  { value:"price-asc", label:"Price: Low to High" },
  { value:"price-desc", label:"Price: High to Low" },
  { value:"rating", label:"Top Rated" },
  { value:"newest", label:"New Arrivals" },
];

function getCatCount(cat) {
  if (cat === "All") return MEN_PRODUCTS.length;
  const collections = ["New In","Summer","Work Wear","Weekend"];
  if (collections.includes(cat)) return MEN_PRODUCTS.filter(p => p.collection === cat).length;
  return MEN_PRODUCTS.filter(p => p.category === cat).length;
}

/* ─── HERO ─── */
function MenHero({ onShopCategory }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const start = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p+1) % MEN_HERO_SLIDES.length), 5500);
  };
  useEffect(() => { start(); return () => clearInterval(timerRef.current); }, []);
  const goTo = (i) => { setActive(i); start(); };
  const prev = () => { setActive(p => (p-1+MEN_HERO_SLIDES.length)%MEN_HERO_SLIDES.length); start(); };
  const next = () => { setActive(p => (p+1)%MEN_HERO_SLIDES.length); start(); };

  return (
    <div className="men-hero">
      {MEN_HERO_SLIDES.map((slide, i) => (
        <div key={i} className={`men-hero-slide${active===i?" men-hero-slide--active":""}`}>
          <img src={slide.img} alt={slide.title} />
          <div className="men-hero-slide__overlay">
            {active===i && (
              <div className="men-hero-caption">
                <div className="men-hero-caption__tag">Men's · {slide.eyebrow}</div>
                <h1 className="men-hero-caption__title" style={{ whiteSpace:"pre-line" }}>{slide.title}</h1>
                <p className="men-hero-caption__sub">{slide.sub}</p>
                <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
                  <button className="men-hero-cta" onClick={() => onShopCategory(slide.category)}>
                    {slide.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  {slide.cta2 && <button className="men-hero-cta2" onClick={() => onShopCategory("New In")}>{slide.cta2}</button>}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <button className="men-hero-arrow men-hero-arrow--prev" onClick={prev}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="men-hero-arrow men-hero-arrow--next" onClick={next}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div className="men-hero-indicators">
        {MEN_HERO_SLIDES.map((_,i) => (
          <button key={i} className={`men-hero-indicator${active===i?" men-hero-indicator--active":""}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}

/* ─── SIDEBAR ─── */
function MenSidebar({ open, onClose, activeCategory, setActiveCategory, onGoHome }) {
  const handleClick = (cat) => { setActiveCategory(cat); onClose(); window.scrollTo({ top:0, behavior:"smooth" }); };
  if (!open) return null;
  return (
    <>
      <div className="men-sidebar-overlay" onClick={onClose} />
      <aside className="men-sidebar">
        <div className="men-sidebar__header">
          <div className="men-sidebar__title">Men's</div>
          <button className="men-sidebar__close" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <button className="men-sidebar__home-btn" onClick={() => { onClose(); onGoHome(); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </button>
        <div className="men-sidebar__divider" />
        {Object.entries(MEN_SIDEBAR).map(([sectionTitle, items]) => (
          <div key={sectionTitle}>
            <div className="men-sidebar__section-title">{sectionTitle}</div>
            {items.map(item => (
              <button
                key={item.category}
                className={`men-sidebar__item${activeCategory===item.category?" men-sidebar__item--active":""}`}
                onClick={() => handleClick(item.category)}
              >
                <span>{item.label}</span>
                <span className="men-sidebar__item-count">{getCatCount(item.category)}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>
    </>
  );
}

/* ─── PRODUCT CARD ─── */
function MenProductCard({ product, onClick, isWishlisted, toggleWishlist, style }) {
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice ? Math.round((1-product.price/product.originalPrice)*100) : null;
  return (
    <div className="men-card" style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="men-card__img-wrap" onClick={onClick}>
        <img src={hovered && product.hoverImage ? product.hoverImage : product.image} alt={product.name} className="men-card__img" />
        {product.badge && <span className={`men-card__badge men-card__badge--${product.badge.toLowerCase()}`}>{product.badge}</span>}
        {discount && <span className="men-card__discount">-{discount}%</span>}
        <div className="men-card__overlay">
          <button className="men-card__quick-btn" onClick={onClick}>Quick View</button>
        </div>
        <button className={`men-card__wish${isWishlisted?" men-card__wish--active":""}`} onClick={e => { e.stopPropagation(); toggleWishlist(product); }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={isWishlisted?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div className="men-card__info">
        <div className="men-card__name" onClick={onClick}>{product.name}</div>
        <div className="men-card__color">{product.color}</div>
        <div className="men-card__footer">
          {product.originalPrice
            ? <><span className="men-card__price men-card__sale-price">£{product.price}</span><span className="men-card__original">£{product.originalPrice}</span></>
            : <span className="men-card__price">£{product.price}</span>}
        </div>
        <div className="men-card__rating">
          {Array(5).fill(null).map((_,i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i<Math.round(product.rating)?"var(--caramel)":"none"} stroke="var(--nude-300)" strokeWidth="1.5">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          ))}
          <span className="men-card__rating-text">{product.rating} ({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT MODAL ─── */
function MenProductModal({ product, onClose, isWishlisted, toggleWishlist, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice ? Math.round((1-product.price/product.originalPrice)*100) : null;
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart({ ...product, selectedSize }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="men-modal-backdrop" onClick={onClose}>
        <div className="men-modal" onClick={e => e.stopPropagation()}>
          <button className="men-modal__close" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div className="men-modal__inner">
            <div className="men-modal__gallery">
              <div className="men-modal__main-img-wrap">
                <img src={activeImg} alt={product.name} className="men-modal__main-img" />
              </div>
              <div className="men-modal__thumbs">
                {[product.image, product.hoverImage].filter(Boolean).map((img,i) => (
                  <button key={i} className={`men-modal__thumb${activeImg===img?" men-modal__thumb--active":""}`} onClick={() => setActiveImg(img)}>
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="men-modal__info">
              <div>
                <div className="men-modal__cat">{product.category}</div>
                <div className="men-modal__rating">
                  {Array(5).fill(null).map((_,i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i<Math.round(product.rating)?"var(--caramel)":"none"} stroke="var(--nude-300)" strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                  <span className="men-modal__rating-text">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
              <h2 className="men-modal__name">{product.name}</h2>
              <div className="men-modal__price-row">
                <span className="men-modal__price">£{product.price}</span>
                {product.originalPrice && <><span className="men-modal__original">£{product.originalPrice}</span><span className="men-modal__save">Save {discount}%</span></>}
              </div>
              <p style={{ fontSize:"13px", color:"var(--text-light)" }}>Colour: <strong style={{ color:"var(--text-mid)" }}>{product.color}</strong></p>
              <div>
                <div className="men-modal__sizes-label">Size {selectedSize ? `— ${selectedSize}` : ""}</div>
                <div className="men-modal__sizes">
                  {product.sizes.map(s => (
                    <button key={s} className={`men-modal__size-btn${selectedSize===s?" men-modal__size-btn--active":""}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
                {!selectedSize && <p className="men-modal__size-hint">Please select a size to continue</p>}
              </div>
              <div className="men-modal__actions">
                <div className="men-modal__qty">
                  <button onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty+1)}>+</button>
                </div>
                <button className={`men-modal__add-btn${added?" men-modal__add-btn--added":""}`} onClick={handleAdd} disabled={!selectedSize}>
                  {added
                    ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>Added!</>
                    : "Add to Cart"}
                </button>
                <button className={`men-modal__wish-btn${isWishlisted?" men-modal__wish-btn--active":""}`} onClick={() => toggleWishlist(product)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <div style={{ borderTop:"1px solid var(--nude-100)", paddingTop:"15px" }}>
                <div className="men-modal__details-title">Product Details</div>
                <ul className="men-modal__details-list">
                  {product.details.map((d,i) => (
                    <li key={i}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--caramel)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="men-modal__shipping">
                <div className="men-modal__shipping-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--caramel)" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Free shipping on orders over £80
                </div>
                <div className="men-modal__shipping-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--caramel)" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.49"/></svg>
                  Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── TICKER ─── */
function MenTicker() {
  const items = ["Free Shipping Over £80","✦","Men's New Arrivals Weekly","✦","Easy 30-Day Returns","✦","Premium Menswear","✦","Work & Weekend Styles","✦"];
  return (
    <div className="men-ticker-bar">
      <div className="men-ticker-track">
        {[...items,...items].map((t,i) => <span key={i} className={t === "✦" ? "men-ticker-gem" : ""}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Men() {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [saleOnly, setSaleOnly] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [showHero, setShowHero] = useState(true);

  const handleShopCategory = (cat) => {
    setActiveCategory(cat);
    setShowHero(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const filtered = useMemo(() => {
    const collections = ["New In","Summer","Work Wear","Weekend"];
    let list = MEN_PRODUCTS;
    if (activeCategory !== "All") {
      if (collections.includes(activeCategory)) list = list.filter(p => p.collection===activeCategory);
      else list = list.filter(p => p.category===activeCategory);
    }
    if (saleOnly) list = list.filter(p => p.badge==="Sale");
    if (sort==="price-asc") return [...list].sort((a,b) => a.price-b.price);
    if (sort==="price-desc") return [...list].sort((a,b) => b.price-a.price);
    if (sort==="rating") return [...list].sort((a,b) => b.rating-a.rating);
    if (sort==="newest") return [...list.filter(p=>p.badge==="New"), ...list.filter(p=>p.badge!=="New")];
    return list;
  }, [activeCategory, sort, saleOnly]);

  return (
    <div className="men-shop-page">
      <MenTicker />

      {showHero && <MenHero onShopCategory={handleShopCategory} />}

      <MenSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => { setActiveCategory(cat); setShowHero(false); }}
        onGoHome={() => setShowHero(true)}
      />

      {!showHero && (
        <div className="men-breadcrumb">
          <a onClick={() => { setShowHero(true); setActiveCategory("All"); }}>Home</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          <a onClick={() => setActiveCategory("All")}>Men's</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          <span>{activeCategory === "All" ? "All Products" : activeCategory}</span>
        </div>
      )}

      <div className="men-tabs-bar">
        <div className="men-tabs-inner">
          <button className="men-filter-btn" onClick={() => setSidebarOpen(true)} style={{ marginRight:"12px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
            Filter
          </button>
          {MEN_TABS.map(tab => (
            <button
              key={tab.category}
              className={`men-tab${activeCategory===tab.category?" men-tab--active":""}`}
              onClick={() => { setActiveCategory(tab.category); setShowHero(false); window.scrollTo({top:0,behavior:"smooth"}); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="men-main-content">
        <div className="men-toolbar">
          <div className="men-count">Showing <strong>{filtered.length}</strong> product{filtered.length!==1?"s":""}</div>
          <div className="men-controls">
            <div className="men-grid-toggle">
              {[2,3,4].map(n => (
                <button key={n} className={`men-grid-btn${gridCols===n?" men-grid-btn--active":""}`} onClick={() => setGridCols(n)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    {n===2 && <><rect x="0" y="0" width="6" height="14" rx="1"/><rect x="8" y="0" width="6" height="14" rx="1"/></>}
                    {n===3 && <><rect x="0" y="0" width="3.5" height="14" rx="1"/><rect x="5.25" y="0" width="3.5" height="14" rx="1"/><rect x="10.5" y="0" width="3.5" height="14" rx="1"/></>}
                    {n===4 && <><rect x="0" y="0" width="2.5" height="14" rx="1"/><rect x="3.8" y="0" width="2.5" height="14" rx="1"/><rect x="7.6" y="0" width="2.5" height="14" rx="1"/><rect x="11.4" y="0" width="2.5" height="14" rx="1"/></>}
                  </svg>
                </button>
              ))}
            </div>
            <label className="men-sale-toggle">
              <input type="checkbox" checked={saleOnly} onChange={e => setSaleOnly(e.target.checked)} />
              <span className="men-sale-toggle__track" />
              <span className="men-sale-toggle__label">Sale Only</span>
            </label>
            <div className="men-sort-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              <select className="men-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={`men-products-grid men-products-grid--${gridCols}`}>
            {filtered.map((p,i) => (
              <MenProductCard
                key={p.id}
                product={p}
                onClick={() => setSelectedProduct(p)}
                isWishlisted={isWishlisted(p.id)}
                toggleWishlist={toggleWishlist}
                style={{ animationDelay:`${i*0.04}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="men-empty">
            <div className="men-empty__title">No products found</div>
            <div className="men-empty__sub">Try a different category or clear your filters.</div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <MenProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={isWishlisted(selectedProduct.id)}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}