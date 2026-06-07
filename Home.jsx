import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart }     from '../context/ShopContext';
import { useWishlist } from '../context/ShopContext';
import { useDrawer }   from '../context/ShopContext';
import './Home.css';

/* ─── DATA ─────────────────────────────────────────────── */
const collections = [
  {
    id: 'women', label: 'Women', subtitle: 'Refined Femininity', page: 'women',
    heroImg: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    products: [
      { id:'h1', name:'Silk Drape Midi Dress', category:'Dresses', price:189, originalPrice:240, discount:21, rating:4.8, reviews:124, color:'Champagne', description:'Effortlessly elegant midi dress crafted from pure silk.', sizes:['XS','S','M','L','XL'], details:['100% Silk','Dry clean only','Imported',"Model is 5'9\""], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', images:['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80','https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80'], badge:'SALE' },
      { id:'h2', name:'Linen Wrap Blazer', category:'Workwear', price:215, originalPrice:null, rating:4.6, reviews:88, color:'Ecru', description:'Structured yet soft linen blazer for the modern professional.', sizes:['XS','S','M','L','XL'], details:['100% Linen','Dry clean recommended','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', images:['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'] },
      { id:'h3', name:'Cashmere Knit Top', category:'Tops', price:145, originalPrice:180, discount:19, rating:4.9, reviews:203, color:'Nude Rose', description:'Ultra-soft cashmere knit for effortless everyday luxury.', sizes:['XS','S','M','L'], details:['100% Cashmere','Hand wash cold','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', images:['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80'], badge:'SALE' },
      { id:'h4', name:'Wide Leg Trousers', category:'Bottoms', price:168, originalPrice:null, rating:4.7, reviews:76, color:'Sand', description:'Flowing wide-leg silhouette in breathable fabric.', sizes:['XS','S','M','L','XL'], details:['Viscose blend','Machine wash gentle','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', images:['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80'] },
    ],
  },
  {
    id: 'men', label: 'Men', subtitle: 'Understated Elegance', page: 'men',
    heroImg: 'https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=800&q=80',
    products: [
      { id:'h5', name:'Merino Wool Coat', category:'Outerwear', price:395, originalPrice:490, discount:19, rating:4.8, reviews:112, color:'Camel', description:'Timeless overcoat in premium merino wool blend.', sizes:['S','M','L','XL','XXL'], details:['Merino Wool blend','Dry clean only','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=600&q=80', images:['https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=600&q=80'], badge:'SALE' },
      { id:'h6', name:'Slim Oxford Shirt', category:'Shirts', price:98, originalPrice:null, rating:4.5, reviews:145, color:'Ivory', description:'Crisp Oxford weave shirt with a modern slim fit.', sizes:['S','M','L','XL'], details:['100% Cotton','Machine wash','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', images:['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80'] },
      { id:'h7', name:'Tailored Chino', category:'Bottoms', price:128, originalPrice:null, rating:4.6, reviews:89, color:'Tan', description:'Sharp, tailored chinos that move with you.', sizes:['30','32','34','36'], details:['Cotton blend','Machine wash','Imported'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80', images:['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80'] },
      { id:'h8', name:'Cashmere Crew Neck', category:'Knitwear', price:175, originalPrice:220, discount:20, rating:4.9, reviews:67, color:'Walnut', description:'Luxuriously soft cashmere crew neck for any occasion.', sizes:['S','M','L','XL'], details:['100% Cashmere','Dry clean only'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80', images:['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80'], badge:'SALE' },
    ],
  },
  {
    id: 'kids', label: 'Kids', subtitle: 'Playful & Pure', page: 'kids',
    heroImg: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    products: [
      { id:'h9',  name:'Cotton Pinafore Dress', category:'Girls', price:58, originalPrice:75, discount:23, rating:4.8, reviews:54, color:'Blush', description:'Sweet organic cotton pinafore for little ones.', sizes:['2Y','4Y','6Y','8Y'], details:['100% Organic Cotton','Machine wash','Imported'], shipping:'Free shipping on orders over £60', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80', images:['https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80'], badge:'SALE' },
      { id:'h10', name:'Linen Play Set', category:'Unisex', price:72, originalPrice:null, rating:4.7, reviews:38, color:'Oat', description:'Breezy linen set perfect for active days.', sizes:['2Y','4Y','6Y','8Y'], details:['100% Linen','Machine wash'], shipping:'Free shipping on orders over £60', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80', images:['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80'] },
      { id:'h11', name:'Knit Cardigan', category:'Boys', price:64, originalPrice:null, rating:4.6, reviews:29, color:'Caramel', description:'Cosy knit cardigan with charming button detail.', sizes:['2Y','4Y','6Y','8Y','10Y'], details:['Wool blend','Hand wash'], shipping:'Free shipping on orders over £60', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80', images:['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80'] },
      { id:'h12', name:'Smocked Midi Dress', category:'Girls', price:82, originalPrice:105, discount:22, rating:4.9, reviews:61, color:'Sage', description:'Hand-smocked midi dress with floral detail.', sizes:['4Y','6Y','8Y','10Y'], details:['Cotton','Hand wash cold'], shipping:'Free shipping on orders over £60', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80', images:['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80'], badge:'SALE' },
    ],
  },
  {
    id: 'shoes', label: 'Shoes', subtitle: 'Walk in Luxury', page: 'shoes',
    heroImg: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    products: [
      { id:'h13', name:'Suede Block Heel', category:'Heels', price:228, originalPrice:285, discount:20, rating:4.8, reviews:97, color:'Cognac', description:'Italian-crafted suede block heel for all-day confidence.', sizes:['35','36','37','38','39','40'], details:['Genuine Suede','Leather sole','Made in Italy'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', images:['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80'], badge:'SALE' },
      { id:'h14', name:'Leather Loafer', category:'Flats', price:185, originalPrice:null, rating:4.7, reviews:142, color:'Tan', description:'Classic penny loafer in smooth full-grain leather.', sizes:['35','36','37','38','39','40','41'], details:['Full-grain leather','Leather sole','Made in Portugal'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80', images:['https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80'] },
      { id:'h15', name:'Strappy Sandal', category:'Sandals', price:148, originalPrice:null, rating:4.6, reviews:78, color:'Nude', description:'Minimalist strappy sandal in buttery soft leather.', sizes:['35','36','37','38','39','40'], details:['Nappa leather','Rubber sole','Made in Spain'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80', images:['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80'] },
      { id:'h16', name:'Ankle Boot', category:'Boots', price:295, originalPrice:365, discount:19, rating:4.9, reviews:58, color:'Chestnut', description:'Sleek ankle boot with a refined pointed toe.', sizes:['35','36','37','38','39','40'], details:['Calfskin leather','Leather sole','Made in Italy'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80', images:['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80'], badge:'SALE' },
    ],
  },
  {
    id: 'bags', label: 'Bags', subtitle: 'Carry with Grace', page: 'bags',
    heroImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    products: [
      { id:'h17', name:'Structured Tote', category:'Totes', price:345, originalPrice:null, rating:4.9, reviews:86, color:'Cognac', description:'Architectural tote in vegetable-tanned leather.', sizes:['One Size'], details:['Vegetable-tanned leather','Cotton lining','Made in Italy'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', images:['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'] },
      { id:'h18', name:'Chain Shoulder Bag', category:'Shoulder Bags', price:265, originalPrice:330, discount:20, rating:4.8, reviews:114, color:'Taupe', description:'Compact shoulder bag with gold chain strap.', sizes:['One Size'], details:['Smooth leather','Gold-tone hardware','Made in France'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', images:['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'], badge:'SALE' },
      { id:'h19', name:'Mini Crossbody', category:'Crossbody', price:178, originalPrice:null, rating:4.7, reviews:93, color:'Blush', description:'Petite crossbody for essentials, beautifully finished.', sizes:['One Size'], details:['Saffiano leather','Silver-tone hardware'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80', images:['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80'] },
      { id:'h20', name:'Woven Clutch', category:'Clutches', price:132, originalPrice:165, discount:20, rating:4.6, reviews:47, color:'Sand', description:'Hand-woven leather clutch, an artisan evening piece.', sizes:['One Size'], details:['Hand-woven leather','Suede lining'], shipping:'Free shipping on orders over £120', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80', images:['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80'], badge:'SALE' },
    ],
  },
  {
    id: 'jewelry', label: 'Jewelry', subtitle: 'Luminous Detail', page: 'jewelry',
    heroImg: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    products: [
      { id:'h21', name:'Gold Hoop Earrings', category:'Earrings', price:98, originalPrice:null, rating:4.9, reviews:231, color:'Gold', description:'18k gold-plated hoops with a polished finish.', sizes:['One Size'], details:['18k Gold Plated','Hypoallergenic','Handcrafted'], shipping:'Free shipping on orders over £80', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', images:['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'] },
      { id:'h22', name:'Pearl Pendant Necklace', category:'Necklaces', price:145, originalPrice:180, discount:19, rating:4.8, reviews:167, color:'Pearl & Gold', description:'Freshwater pearl drop on a delicate gold chain.', sizes:['One Size'], details:['Freshwater Pearl','18k Gold Plated chain','Handcrafted'], shipping:'Free shipping on orders over £80', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', images:['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'], badge:'SALE' },
      { id:'h23', name:'Stacking Rings Set', category:'Rings', price:78, originalPrice:null, rating:4.7, reviews:189, color:'Mixed Gold', description:'Set of three delicate rings, perfect to stack.', sizes:['5','6','7','8'], details:['Sterling Silver','18k Gold Plated','Handcrafted'], shipping:'Free shipping on orders over £80', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', images:['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'] },
      { id:'h24', name:'Cuff Bracelet', category:'Bracelets', price:115, originalPrice:145, discount:21, rating:4.6, reviews:73, color:'Gold', description:'Wide cuff bracelet with hammered texture detail.', sizes:['One Size'], details:['Brass','18k Gold Plated','Handcrafted'], shipping:'Free shipping on orders over £80', returns:'Free returns within 30 days', image:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80', images:['https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80'], badge:'SALE' },
    ],
  },
];

const tickerItems = ['Free Shipping Over £120','New Arrivals Weekly','Sustainable Luxury','Complimentary Returns','Artisan Craftsmanship','Up to 25% Off Sale'];

/* ─── HOME ─────────────────────────────────────────────── */
export default function Home() {
  const { addToCart }                    = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { setCartOpen }                  = useDrawer();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize]       = useState(null);
  const [quantity, setQuantity]               = useState(1);
  const [activeImage, setActiveImage]         = useState(0);

  const navigate = useNavigate();

  const openModal  = (product) => { setSelectedProduct(product); setSelectedSize(null); setQuantity(1); setActiveImage(0); };
  const closeModal = () => setSelectedProduct(null);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({ ...selectedProduct, selectedSize }, quantity);
    closeModal();
    setCartOpen(true);
  };

  const handleWishlist = (product, e) => {
    e?.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="home-wrapper">

      {/* ── TICKER ── */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ticker-item">
              {t}<span className="ticker-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid">

          {/* Left — big image */}
          <div className="hero-img-main">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=90"
              alt="Hero fashion"
            />
            <div className="hero-img-overlay" />
          </div>

          {/* Right — content panel */}
          <div className="hero-right">

            {/* Text block */}
            <div className="hero-text">
              <span className="hero-eyebrow">New Season 2026</span>
              <div className="hero-rule" />
              <h1 className="hero-title">
                <span className="hero-title-line1">Elevate</span>
                <span className="hero-title-line2">Your Style</span>
              </h1>
              <p className="hero-sub">
                Feel the fashion — curated pieces where timeless elegance meets modern restraint.
              </p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => navigate('/women')}>Shop Now</button>
                <button className="btn-outline"  onClick={() => navigate('/men')}>New Arrivals</button>
              </div>
            </div>

            {/* Two stacked images at the bottom */}
            <div className="hero-stack">
              <div className="hero-img-sm">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" alt="Style" />
              </div>
              <div className="hero-img-sm">
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" alt="Fashion" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY QUICK LINKS ── */}
      <section className="quick-cats">
        <div className="qc-inner">
          <div className="section-head center">
            <span className="section-eyebrow">Shop by Category</span>
            <h2 className="section-title">Collections</h2>
          </div>
          <div className="qc-grid">
            {[
              { id:'women',   label:'Women',   img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' },
              { id:'men',     label:'Men',     img:'https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=500&q=80' },
              { id:'kids',    label:'Kids',    img:'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=80' },
              { id:'shoes',   label:'Shoes',   img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' },
              { id:'bags',    label:'Bags',    img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
              { id:'jewelry', label:'Jewelry', img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80' },
            ].map(cat => (
              <button key={cat.id} className="qc-card" onClick={() => navigate(`/${cat.id}`)}>
                <div className="qc-img-wrap">
                  <img src={cat.img} alt={cat.label} />
                </div>
                <span className="qc-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO SPLIT ── */}
      <section className="promo-split">
        <div className="promo-split-image">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80" alt="Spring Collection" />
        </div>
        <div className="promo-split-content">
          <span className="section-eyebrow">Limited Time</span>
          <h2 className="promo-title">Spring<br />Collection</h2>
          <p className="promo-sub">Discover our most coveted pieces for the new season — effortless, luminous, and entirely you.</p>
          <button className="btn-primary" onClick={() => navigate('/women')}>Shop Now</button>
          <div className="promo-badges">
            <span className="promo-badge">Up to 25% Off</span>
            <span className="promo-badge">New In Daily</span>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      {collections.map((col, idx) => (
        <section key={col.id} className={`collection-section ${idx % 2 === 1 ? 'collection-alt' : ''}`}>
          <div className="collection-inner">
            <div className="collection-header">
              <div>
                <span className="section-eyebrow">{col.subtitle}</span>
                <h2 className="section-title">{col.label}</h2>
              </div>
              <button className="see-more-btn" onClick={() => navigate(`/${col.page}`)}>
                See All {col.label}
              </button>
            </div>
            <div className="product-row">
              {col.products.map((product) => {
                const wished = isWishlisted(product.id);
                return (
                  <div key={product.id} className="product-card" style={{ position: 'relative' }}>

                    {/* Wishlist heart */}
                    <button
                      onClick={(e) => handleWishlist(product, e)}
                      className="wishlist-btn"
                      style={{
                        background: wished ? 'var(--c-brown-dk)' : 'rgba(255,255,255,0.88)',
                      }}
                      title={wished ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24"
                        fill={wished ? '#fff' : 'none'}
                        stroke={wished ? '#fff' : 'currentColor'}
                        strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>

                    <div className="product-card-img" onClick={() => openModal(product)}>
                      <img src={product.image} alt={product.name} />
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                      <div className="product-hover-cta"><span>Quick View</span></div>
                    </div>

                    <div className="product-info">
                      <span className="product-cat">{product.category}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price-row">
                        <span className="product-price">£{product.price}</span>
                        {product.originalPrice && (
                          <>
                            <span className="product-was">£{product.originalPrice}</span>
                            <span className="product-save">−{product.discount}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ── TRUST STRIP ── */}
      <section className="trust-strip">
        {[
          { heading:'Free Shipping',    sub:'On orders over £120' },
          { heading:'Easy Returns',     sub:'30-day no-hassle policy' },
          { heading:'Authentic Luxury', sub:'100% genuine products' },
          { heading:'Secure Checkout',  sub:'Encrypted & safe payment' },
        ].map((t, i) => (
          <div key={i} className="trust-box">
            <span className="trust-heading">{t.heading}</span>
            <span className="trust-sub">{t.sub}</span>
          </div>
        ))}
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className="editorial">
        <div className="editorial-inner">
          <div className="editorial-img">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80" alt="Editorial" />
          </div>
          <div className="editorial-body">
            <span className="section-eyebrow">The Iconique Edit</span>
            <h2 className="editorial-title">Dressed for<br />Every Chapter</h2>
            <p className="editorial-sub">From morning light to evening gold — our curated wardrobe moves with you through every season of life.</p>
            <button className="btn-primary" onClick={() => navigate('/women')}>Explore the Edit</button>
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="bestseller-strip">
        <div className="bestseller-inner">
          <div className="section-head center">
            <span className="section-eyebrow">Customer Favourites</span>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <div className="bestseller-row">
            {[
              { id:'h1',  name:'Silk Drape Midi Dress',  price:189, img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',  col:'women'   },
              { id:'h18', name:'Chain Shoulder Bag',      price:265, img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',  col:'bags'    },
              { id:'h21', name:'Gold Hoop Earrings',      price:98,  img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80',  col:'jewelry' },
              { id:'h13', name:'Suede Block Heel',        price:228, img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',  col:'shoes'   },
              { id:'h3',  name:'Cashmere Knit Top',       price:145, img:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80',  col:'women'   },
              { id:'h22', name:'Pearl Pendant Necklace',  price:145, img:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',  col:'jewelry' },
            ].map((p, i) => {
              const full = collections.find(c => c.id === p.col)?.products.find(pr => pr.id === p.id);
              return (
                <div key={i} className="bs-card" onClick={() => full && openModal(full)}>
                  <div className="bs-img"><img src={p.img} alt={p.name} /></div>
                  <span className="bs-name">{p.name}</span>
                  <span className="bs-price">£{p.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <span className="section-eyebrow">Stay in the Loop</span>
          <h2 className="newsletter-title">Join the Iconique Circle</h2>
          <p className="newsletter-sub">Be first to know about new arrivals, exclusive offers, and style stories.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      {/* ── QUICK VIEW MODAL ── */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&#x2715;</button>

            {/* Left */}
            <div className="modal-left">
              <div className="modal-main-img">
                <img src={selectedProduct.images[activeImage]} alt={selectedProduct.name} />
                {selectedProduct.badge && <span className="modal-badge">{selectedProduct.badge}</span>}
              </div>
              {selectedProduct.images.length > 1 && (
                <div className="modal-thumbs">
                  {selectedProduct.images.map((img, i) => (
                    <div
                      key={i}
                      className={`modal-thumb ${activeImage === i ? 'active' : ''}`}
                      onClick={() => setActiveImage(i)}
                    >
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right */}
            <div className="modal-right">
              <span className="modal-cat">{selectedProduct.category}</span>
              <div className="modal-stars">
                {'★'.repeat(Math.floor(selectedProduct.rating))}
                <span className="modal-rating-txt">
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </span>
              </div>
              <h2 className="modal-name">{selectedProduct.name}</h2>
              <div className="modal-prices">
                <span className="modal-price">£{selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <>
                    <span className="modal-was">£{selectedProduct.originalPrice}</span>
                    <span className="modal-save-badge">Save {selectedProduct.discount}%</span>
                  </>
                )}
              </div>
              <p className="modal-color-row">Color: <strong>{selectedProduct.color}</strong></p>
              <p className="modal-desc">{selectedProduct.description}</p>

              <div className="modal-size-wrap">
                <p className="modal-size-lbl">Size</p>
                <div className="modal-sizes">
                  {selectedProduct.sizes.map(sz => (
                    <button
                      key={sz}
                      className={`sz-btn ${selectedSize === sz ? 'sz-active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="sz-hint">Please select a size</p>}
              </div>

              <div className="modal-actions">
                <div className="qty-ctrl">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>&#8722;</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>&#43;</button>
                </div>
                <button
                  className="atc-btn"
                  disabled={!selectedSize}
                  onClick={handleAddToCart}
                >
                  Add to Bag
                </button>
              </div>

              {/* Wishlist in modal */}
              <button
                onClick={() => handleWishlist(selectedProduct)}
                className="modal-wishlist-btn"
                style={{
                  borderColor: isWishlisted(selectedProduct.id) ? 'var(--c-brown-dk)' : 'var(--c-nude)',
                  color: isWishlisted(selectedProduct.id) ? 'var(--c-brown-dk)' : 'var(--c-text2)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24"
                  fill={isWishlisted(selectedProduct.id) ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isWishlisted(selectedProduct.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>

              <div className="modal-details-block">
                <p className="mdb-title">Product Details</p>
                {selectedProduct.details.map((d, i) => (
                  <p key={i} className="mdb-item">{d}</p>
                ))}
              </div>
              <div className="modal-ship-block">
                <p>{selectedProduct.shipping}</p>
                <p>{selectedProduct.returns}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}