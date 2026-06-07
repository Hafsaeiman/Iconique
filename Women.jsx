import { useState, useEffect, useMemo, useRef } from "react";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";
import './Women.css';

/* ─── HERO SLIDES DATA ─── */
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=85",
    eyebrow: "New Season · 2025",
    title: "Elevated\nEveryday",
    sub: "Refined pieces for the modern woman",
    cta: "Shop New Arrivals",
    category: "New In",
  },
  {
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1800&q=85",
    eyebrow: "Summer Edit",
    title: "Pure\nWhites",
    sub: "Clean, crisp, luminous silhouettes",
    cta: "Explore Summer Whites",
    category: "Summer Whites",
  },
  {
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1800&q=85",
    eyebrow: "Signature Dresses",
    title: "Dressed\nto Dream",
    sub: "From afternoon to evening, effortlessly",
    cta: "Shop Dresses",
    category: "Dresses",
  },
  {
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1800&q=85",
    eyebrow: "Outerwear Collection",
    title: "Layer Up\nin Luxury",
    sub: "Coats and jackets that make a statement",
    cta: "Shop Outerwear",
    category: "Outerwear",
  },
  {
    img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=1800&q=85",
    eyebrow: "The Pause Edit",
    title: "Move\nwith Grace",
    sub: "Activewear and loungewear reimagined",
    cta: "Shop Pause",
    category: "Pause",
  },
];

/* ─── SIDEBAR & TABS DATA ─── */
const SIDEBAR_STRUCTURE = {
  Collections: [
    { label: "New In", category: "New In" },
    { label: "Elevated Wardrobe", category: "Elevated Wardrobe" },
    { label: "Summer Whites", category: "Summer Whites" },
    { label: "Pause", category: "Pause" },
  ],
  "Shop by Category": [
    { label: "View All", category: "All" },
    { label: "T-Shirts", category: "T-Shirts" },
    { label: "Shirts", category: "Shirts" },
    { label: "Dresses & Jumpsuits", category: "Dresses" },
    { label: "Skirts & Shorts", category: "Skirts" },
    { label: "Denim", category: "Denim" },
    { label: "Trousers", category: "Trousers" },
    { label: "Activewear", category: "Activewear" },
    { label: "Jeans", category: "Jeans" },
    { label: "Tops", category: "Tops" },
    { label: "Outerwear", category: "Outerwear" },
    { label: "Shoes", category: "Shoes" },
    { label: "Accessories", category: "Accessories" },
    { label: "Intimates", category: "Intimates" },
  ],
};

const CATEGORY_TABS = [
  { label: "All", category: "All" },
  { label: "Basics", category: "T-Shirts" },
  { label: "Tops", category: "Tops" },
  { label: "Shirts", category: "Shirts" },
  { label: "Dresses", category: "Dresses" },
  { label: "Skirts", category: "Skirts" },
  { label: "Jeans", category: "Jeans" },
  { label: "Trousers", category: "Trousers" },
  { label: "Denim", category: "Denim" },
  { label: "Outerwear", category: "Outerwear" },
  { label: "Activewear", category: "Activewear" },
  { label: "Shoes", category: "Shoes" },
  { label: "Accessories", category: "Accessories" },
  { label: "Intimates", category: "Intimates" },
];

/* ─── PRODUCTS DATA — every image unique ─── */
const ALL_PRODUCTS = [
  {
    id: "p1",
    name: "Silk Drape Midi Dress",
    category: "Dresses",
    collection: "New In",
    price: 189,
    originalPrice: 240,
    badge: "Sale",
    color: "Champagne",
    sizes: ["XS","S","M","L","XL"],
    description: "Effortlessly elegant midi dress crafted from pure silk.",
    details: ["100% Silk","Dry clean only","Imported","Model is 5'9\""],
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
  },
  {
    id: "p2",
    name: "Linen Wrap Blazer",
    category: "Outerwear",
    collection: "Elevated Wardrobe",
    price: 215,
    originalPrice: null,
    badge: "New",
    color: "Warm Sand",
    sizes: ["XS","S","M","L"],
    description: "Tailored linen blazer with a relaxed wrap silhouette.",
    details: ["100% Linen","Dry clean","Relaxed fit","Side pockets"],
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: "p3",
    name: "Cashmere Ribbed Knit",
    category: "Tops",
    collection: "New In",
    price: 145,
    originalPrice: 180,
    badge: "Sale",
    color: "Blush Rose",
    sizes: ["XS","S","M","L","XL"],
    description: "Luxuriously soft cashmere knit with fine ribbing.",
    details: ["100% Cashmere","Hand wash cold","True to size","Cropped length"],
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
  },
  {
    id: "p4",
    name: "Suede Block Heel Mule",
    category: "Shoes",
    collection: "New In",
    price: 165,
    originalPrice: null,
    badge: "New",
    color: "Camel",
    sizes: ["36","37","38","39","40","41"],
    description: "Sleek suede mule with a sculptural block heel.",
    details: ["Genuine suede upper","Leather lining","4cm block heel","Slip-on style"],
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&q=80",
  },
  {
    id: "p5",
    name: "Pleated Maxi Skirt",
    category: "Skirts",
    collection: "Summer Whites",
    price: 128,
    originalPrice: 160,
    badge: "Sale",
    color: "Ivory",
    sizes: ["XS","S","M","L","XL"],
    description: "Flowing pleated maxi skirt with a high waist.",
    details: ["100% Polyester Chiffon","Hand wash","High waist","Ankle length"],
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    id: "p6",
    name: "Oversized Trench Coat",
    category: "Outerwear",
    collection: "Elevated Wardrobe",
    price: 340,
    originalPrice: null,
    badge: null,
    color: "Caramel",
    sizes: ["XS","S","M","L"],
    description: "A modern reinterpretation of the classic trench.",
    details: ["Cotton blend","Dry clean only","Oversized fit","Belt included"],
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
  },
  {
    id: "p7",
    name: "Satin Camisole Top",
    category: "Tops",
    collection: "Summer Whites",
    price: 79,
    originalPrice: 99,
    badge: "Sale",
    color: "Pearl",
    sizes: ["XS","S","M","L"],
    description: "Silky smooth satin camisole with spaghetti straps.",
    details: ["100% Satin","Hand wash cold","Adjustable straps","Regular fit"],
    rating: 4.5,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  },
  {
    id: "p8",
    name: "Leather Tote Bag",
    category: "Accessories",
    collection: "Elevated Wardrobe",
    price: 295,
    originalPrice: null,
    badge: "New",
    color: "Tan",
    sizes: ["One Size"],
    description: "Structured genuine leather tote with gold-tone hardware.",
    details: ["Genuine leather","Interior zip pocket","Magnetic closure","27cm x 35cm"],
    rating: 4.8,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590739293931-a4a385c5d3a6?w=600&q=80",
  },
  {
    id: "p9",
    name: "Wrap Midi Dress",
    category: "Dresses",
    collection: "Pause",
    price: 156,
    originalPrice: 195,
    badge: "Sale",
    color: "Terracotta",
    sizes: ["XS","S","M","L","XL"],
    description: "A timeless wrap dress in a rich earth tone.",
    details: ["Viscose blend","Machine wash 30°","Wrap style","Lined"],
    rating: 4.6,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
  },
  {
    id: "p10",
    name: "Strappy Heeled Sandal",
    category: "Shoes",
    collection: "Summer Whites",
    price: 189,
    originalPrice: null,
    badge: null,
    color: "Nude",
    sizes: ["36","37","38","39","40"],
    description: "Delicate strappy sandal with a slender kitten heel.",
    details: ["Leather upper","Leather lining","6cm heel","Ankle strap"],
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&q=80",
  },
  {
    id: "p11",
    name: "Wide Leg Linen Trousers",
    category: "Trousers",
    collection: "Summer Whites",
    price: 112,
    originalPrice: 140,
    badge: "Sale",
    color: "Ecru",
    sizes: ["XS","S","M","L","XL"],
    description: "Breathable wide-leg linen trousers with a high rise.",
    details: ["100% Linen","Machine wash cold","High rise","Wide leg"],
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
  },
  {
    id: "p12",
    name: "Ribbed Sports Bra",
    category: "Activewear",
    collection: "Pause",
    price: 55,
    originalPrice: null,
    badge: "New",
    color: "Slate Blue",
    sizes: ["XS","S","M","L","XL"],
    description: "Medium-support ribbed sports bra with clean lines.",
    details: ["82% Nylon 18% Elastane","Machine wash","Medium support","Built-in cups"],
    rating: 4.7,
    reviews: 302,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
  },
  {
    id: "p13",
    name: "Straight Leg Jeans",
    category: "Jeans",
    collection: "Elevated Wardrobe",
    price: 98,
    originalPrice: null,
    badge: "New",
    color: "Mid Wash",
    sizes: ["24","25","26","27","28","29","30"],
    description: "Classic straight-leg jeans with a mid-rise waist.",
    details: ["98% Cotton 2% Elastane","Machine wash","Straight fit","5-pocket styling"],
    rating: 4.8,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
  },
  {
    id: "p14",
    name: "Oversized Linen Shirt",
    category: "Shirts",
    collection: "New In",
    price: 88,
    originalPrice: 110,
    badge: "Sale",
    color: "Oat",
    sizes: ["XS","S","M","L","XL"],
    description: "Relaxed oversized linen shirt, perfect for layering.",
    details: ["100% Linen","Machine wash","Oversized fit","Front pockets"],
    rating: 4.5,
    reviews: 241,
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80",
  },
  {
    id: "p15",
    name: "Seamless Yoga Set",
    category: "Activewear",
    collection: "Pause",
    price: 95,
    originalPrice: 120,
    badge: "Sale",
    color: "Dusty Mauve",
    sizes: ["XS","S","M","L"],
    description: "Seamless matching yoga set — bra and high-waist leggings.",
    details: ["72% Nylon 28% Elastane","Machine wash","High waist","4-way stretch"],
    rating: 4.9,
    reviews: 418,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  },
  {
    id: "p16",
    name: "Gold Chain Necklace",
    category: "Accessories",
    collection: "New In",
    price: 68,
    originalPrice: null,
    badge: "New",
    color: "Gold",
    sizes: ["One Size"],
    description: "Delicate 18k gold-plated chain necklace, 45cm length.",
    details: ["18k gold plated","Lobster clasp","45cm + 5cm extension","Nickel free"],
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: "p17",
    name: "Broderie Anglaise Top",
    category: "T-Shirts",
    collection: "Summer Whites",
    price: 72,
    originalPrice: null,
    badge: "New",
    color: "White",
    sizes: ["XS","S","M","L","XL"],
    description: "Pretty broderie anglaise cotton top with scalloped hem.",
    details: ["100% Cotton","Machine wash","Regular fit","Scalloped hem"],
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    id: "p18",
    name: "Pointed Court Heel",
    category: "Shoes",
    collection: "Elevated Wardrobe",
    price: 145,
    originalPrice: 180,
    badge: "Sale",
    color: "Black",
    sizes: ["36","37","38","39","40","41"],
    description: "Timeless pointed-toe court shoe with a slender stiletto.",
    details: ["Leather upper","Leather lining","9cm heel","Pointed toe"],
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  },
  {
    id: "p19",
    name: "Floral Midi Skirt",
    category: "Skirts",
    collection: "New In",
    price: 95,
    originalPrice: null,
    badge: "New",
    color: "Garden Print",
    sizes: ["XS","S","M","L","XL"],
    description: "Romantic floral midi skirt in a light chiffon fabric.",
    details: ["100% Chiffon","Hand wash","Elasticated waist","Midi length"],
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=600&q=80",
  },
  {
    id: "p20",
    name: "Silk Pyjama Set",
    category: "Intimates",
    collection: "Elevated Wardrobe",
    price: 165,
    originalPrice: 210,
    badge: "Sale",
    color: "Soft Sage",
    sizes: ["XS","S","M","L","XL"],
    description: "Luxurious silk pyjama set with contrast piping.",
    details: ["100% Silk","Hand wash","Relaxed fit","Contrast piping"],
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "New Arrivals" },
];

function getCategoryCount(cat) {
  if (cat === "All") return ALL_PRODUCTS.length;
  const collections = ["New In","Elevated Wardrobe","Summer Whites","Pause"];
  if (collections.includes(cat)) return ALL_PRODUCTS.filter(p => p.collection === cat).length;
  return ALL_PRODUCTS.filter(p => p.category === cat).length;
}

/* ─── TICKER ─── */
function TickerBar() {
  const items = ["Free Shipping Over £120","✦","New Arrivals Every Week","✦","Easy 30-Day Returns","✦","Exclusive Members Offers","✦","Sustainable Fashion","✦","Women's Collection 2025","✦"];
  return (
    <div className="ticker-bar">
      <div className="ticker-bar__track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─── HERO SLIDESHOW ─── */
function HeroSlideshow({ onShopNow }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => { setActive(i); startTimer(); };
  const prev = () => { setActive(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); startTimer(); };
  const next = () => { setActive(prev => (prev + 1) % HERO_SLIDES.length); startTimer(); };

  return (
    <div className="hero-fullpage">
      {HERO_SLIDES.map((slide, i) => (
        <div key={i} className={`hero-slide${active === i ? " hero-slide--active" : ""}`}>
          <img src={slide.img} alt={slide.title} />
          <div className="hero-slide__overlay">
            {active === i && (
              <div className="hero-caption">
                <div className="hero-caption__eyebrow">{slide.eyebrow}</div>
                <h1 className="hero-caption__title" style={{ whiteSpace: "pre-line" }}>{slide.title}</h1>
                <p className="hero-caption__sub">{slide.sub}</p>
                <button className="hero-caption__cta" onClick={() => onShopNow(slide.category)}>
                  {slide.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <button className="hero-arrow hero-arrow--prev" onClick={prev}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="hero-arrow hero-arrow--next" onClick={next}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="hero-indicators">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} className={`hero-indicator${active === i ? " hero-indicator--active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>

      <div className="hero-scroll-hint">
        <div className="hero-scroll-hint__line" />
        <span>Scroll</span>
      </div>
    </div>
  );
}

/* ─── SIDEBAR DRAWER ─── */
function ShopSidebar({ activeCategory, setActiveCategory, open, onClose, onNavigate }) {
  const handleClick = (cat) => {
    setActiveCategory(cat);
    onNavigate("shop");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!open) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <aside className="shop-sidebar">
        <div className="shop-sidebar__header">
          <div className="shop-sidebar__title">Women's</div>
          <button className="shop-sidebar__close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        {Object.entries(SIDEBAR_STRUCTURE).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="shop-sidebar__section">
            <div className="shop-sidebar__section-title">{sectionTitle}</div>
            {items.map(item => {
              const count = getCategoryCount(item.category);
              return (
                <button
                  key={item.category}
                  className={`shop-sidebar__item${activeCategory === item.category ? " shop-sidebar__item--active" : ""}`}
                  onClick={() => handleClick(item.category)}
                >
                  <span>{item.label}</span>
                  {count > 0 && <span className="shop-sidebar__item-count">{count}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </aside>
    </>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, onClick, isWishlisted, toggleWishlist, style }) {
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div className="product-card" style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="product-card__img-wrap" onClick={onClick}>
        <img src={hovered && product.hoverImage ? product.hoverImage : product.image} alt={product.name} className="product-card__img" />
        {product.badge && <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase()}`}>{product.badge}</span>}
        {discount && <span className="product-card__discount">-{discount}%</span>}
        <div className="product-card__overlay">
          <button className="product-card__quick-btn" onClick={onClick}>Quick View</button>
        </div>
        <div className="product-card__wish-overlay">
          <button
            className={`product-card__wish${isWishlisted ? " product-card__wish--active" : ""}`}
            onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__name" onClick={onClick}>{product.name}</div>
        <div className="product-card__color">{product.color}</div>
        <div className="product-card__footer">
          {product.originalPrice ? (
            <>
              <span className="product-card__price product-card__sale-price">£{product.price}</span>
              <span className="product-card__original">£{product.originalPrice}</span>
            </>
          ) : (
            <span className="product-card__price">£{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT MODAL ─── */
function ProductModal({ product, onClose, isWishlisted, toggleWishlist, addToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart({ ...product, selectedSize }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="modal__inner">
          <div className="modal__gallery">
            <div className="modal__main-img-wrap">
              <img src={activeImg} alt={product.name} className="modal__main-img" />
              {product.badge && (
                <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase()}`} style={{ position: "absolute", top: 14, left: 14 }}>{product.badge}</span>
              )}
            </div>
            <div className="modal__thumbs">
              {[product.image, product.hoverImage].filter(Boolean).map((img, i) => (
                <button key={i} className={`modal__thumb${activeImg === img ? " modal__thumb--active" : ""}`} onClick={() => setActiveImg(img)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="modal__info">
            <div>
              <div className="modal__cat">{product.category}</div>
              <div className="modal__rating">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? "var(--nude-500)" : "none"} stroke="var(--nude-400)" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                ))}
                <span className="modal__rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
            <h2 className="modal__name">{product.name}</h2>
            <div className="modal__price-row">
              <span className="modal__price">£{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="modal__original">£{product.originalPrice}</span>
                  <span className="modal__save">Save {discount}%</span>
                </>
              )}
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-light)" }}>Color: <strong style={{ color: "var(--text-mid)" }}>{product.color}</strong></p>
            <p style={{ fontSize: "14px", color: "var(--text-mid)", lineHeight: "1.75" }}>{product.description}</p>
            <div>
              <div className="modal__sizes-label">Size {selectedSize ? `— ${selectedSize}` : ""}</div>
              <div className="modal__sizes">
                {product.sizes.map(s => (
                  <button key={s} className={`modal__size-btn${selectedSize === s ? " modal__size-btn--active" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
              {!selectedSize && <p className="modal__size-hint">Please select a size</p>}
            </div>
            <div className="modal__actions">
              <div className="modal__qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className={`modal__add-btn${added ? " modal__add-btn--added" : ""}`} onClick={handleAdd} disabled={!selectedSize}>
                {added ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>Added!</> : "Add to Cart"}
              </button>
              <button className={`modal__wish-btn${isWishlisted ? " modal__wish-btn--active" : ""}`} onClick={() => toggleWishlist(product)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div style={{ borderTop: "1px solid var(--nude-100)", paddingTop: "16px" }}>
              <div className="modal__details-title">Product Details</div>
              <ul className="modal__details-list">
                {product.details.map((d, i) => (
                  <li key={i}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--nude-500)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>{d}</li>
                ))}
              </ul>
            </div>
            <div className="modal__shipping">
              <div className="modal__shipping-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Free shipping on orders over £120
              </div>
              <div className="modal__shipping-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.49"/></svg>
                Free returns within 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SHOP PAGE ─── */
function ShopPage({ activeCategory, setActiveCategory, onProductClick, isWishlisted, toggleWishlist }) {
  const [sort, setSort] = useState("featured");
  const [saleOnly, setSaleOnly] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const currentTab = CATEGORY_TABS.find(t => t.category === activeCategory) || { label: activeCategory };

  const filtered = useMemo(() => {
    const collections = ["New In","Elevated Wardrobe","Summer Whites","Pause"];
    let list = ALL_PRODUCTS;
    if (activeCategory !== "All") {
      if (collections.includes(activeCategory)) list = list.filter(p => p.collection === activeCategory);
      else list = list.filter(p => p.category === activeCategory);
    }
    if (saleOnly) list = list.filter(p => p.badge === "Sale");
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") return [...list.filter(p => p.badge === "New"), ...list.filter(p => p.badge !== "New")];
    return list;
  }, [activeCategory, sort, saleOnly]);

  const handleTabClick = (cat) => {
    setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="shop-page">
      <div className="breadcrumb">
        <a>Home</a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        <a>Women</a>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        <span>Women — {currentTab.label}</span>
      </div>

      <div className="category-tabs-bar">
        <div className="category-tabs-inner">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.category}
              className={`category-tab${activeCategory === tab.category ? " category-tab--active" : ""}`}
              onClick={() => handleTabClick(tab.category)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="products-toolbar">
          <div className="products-count">Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}</div>
          <div className="products-controls">
            <div className="grid-toggle">
              {[2, 3, 4].map(n => (
                <button key={n} className={`grid-toggle-btn${gridCols === n ? " grid-toggle-btn--active" : ""}`} onClick={() => setGridCols(n)} title={`${n} columns`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    {n === 2 && <><rect x="0" y="0" width="6" height="14" rx="1"/><rect x="8" y="0" width="6" height="14" rx="1"/></>}
                    {n === 3 && <><rect x="0" y="0" width="3.5" height="14" rx="1"/><rect x="5.25" y="0" width="3.5" height="14" rx="1"/><rect x="10.5" y="0" width="3.5" height="14" rx="1"/></>}
                    {n === 4 && <><rect x="0" y="0" width="2.5" height="14" rx="1"/><rect x="3.8" y="0" width="2.5" height="14" rx="1"/><rect x="7.6" y="0" width="2.5" height="14" rx="1"/><rect x="11.4" y="0" width="2.5" height="14" rx="1"/></>}
                  </svg>
                </button>
              ))}
            </div>
            <label className="sale-toggle">
              <input type="checkbox" checked={saleOnly} onChange={e => setSaleOnly(e.target.checked)} />
              <span className="sale-toggle__track" />
              <span className="sale-toggle__label">Sale Only</span>
            </label>
            <div className="sort-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={`products-grid products-grid--${gridCols}`}>
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => onProductClick(p)}
                isWishlisted={isWishlisted(p.id)}
                toggleWishlist={toggleWishlist}
                style={{ animationDelay: `${i * 0.03}s` }}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-light)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", marginBottom: "8px", fontStyle: "italic" }}>No products found</div>
            <div style={{ fontSize: "14px" }}>Try a different category or remove filters.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ROOT COMPONENT ─── */
export default function Women() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleShopNow = (category) => {
    setActiveCategory(category || "All");
    setPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TickerBar />

      <ShopSidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={setPage}
      />

      <div style={{ flex: 1 }}>
        {page === "home" ? (
          <HeroSlideshow onShopNow={handleShopNow} />
        ) : (
          <ShopPage
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onProductClick={setSelectedProduct}
            isWishlisted={isWishlisted}
            toggleWishlist={toggleWishlist}
          />
        )}
      </div>

      {selectedProduct && (
        <ProductModal
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