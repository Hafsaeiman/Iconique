import { useState, useEffect, useMemo, useRef } from "react";
import "./Kids.css";
import { useCart } from "../context/ShopContext";
import { useWishlist } from "../context/ShopContext";
import { useDrawer } from "../context/ShopContext";

/* ─── DATA ─── */
const KIDS_HERO_SLIDES = [
  { img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1800&q=85", eyebrow:"Kids' Collection", title:"Play Loud,\nDress Bold.", sub:"Comfortable, durable, and seriously stylish kids' clothing.", cta:"Shop All Kids'", cta2:"New Arrivals", category:"All" },
  { img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1800&q=85", eyebrow:"Back to School", title:"Ready for\nEvery Day.", sub:"Smart, hardwearing essentials for the new term and beyond.", cta:"Shop School", cta2:null, category:"School" },
  { img:"https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=1800&q=85", eyebrow:"Outdoor & Play", title:"Adventure\nAwaits.", sub:"Jackets, trainers and activewear for every adventure.", cta:"Shop Jackets", cta2:null, category:"Jackets" },
];

const KIDS_PRODUCTS = [
  {
    id:"k1", name:"Dino Print T-Shirt", category:"T-Shirts", collection:"New In",
    price:18, originalPrice:null, badge:"New", color:"Bright Green",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.9, reviews:312,
    details:["100% Organic Cotton","Machine wash","Relaxed fit","Fun dino print"],
    image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
  },
  {
    id:"k2", name:"Cargo Adventure Shorts", category:"Shorts", collection:"Summer",
    price:22, originalPrice:28, badge:"Sale", color:"Khaki",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.7, reviews:198,
    details:["100% Cotton","Machine wash","Elasticated waist","Multiple pockets"],
    image:"https://images.unsplash.com/photo-1555861496-0666c8981751?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
  },
  {
    id:"k3", name:"Rainbow Stripe Hoodie", category:"Hoodies", collection:"New In",
    price:35, originalPrice:44, badge:"Sale", color:"Multi",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.8, reviews:275,
    details:["80% Cotton 20% Poly","Machine wash","Regular fit","Front pocket"],
    image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  },
  {
    id:"k4", name:"School Uniform Shirt", category:"Uniform", collection:"School",
    price:14, originalPrice:null, badge:null, color:"White",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.6, reviews:501,
    details:["65% Poly 35% Cotton","Machine wash","Regular fit","Easy-iron"],
    image:"https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600&q=80",
  },
  {
    id:"k5", name:"Chunky Trainer Shoe", category:"Shoes", collection:"New In",
    price:42, originalPrice:52, badge:"Sale", color:"White & Blue",
    sizes:["4UK","6UK","8UK","10UK","12UK","1JN","3JN","5JN"],
    rating:4.7, reviews:167,
    details:["Synthetic upper","Cushioned sole","Lace-up","Durable outsole"],
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
  },
  {
    id:"k6", name:"Cosy Fleece Pyjama Set", category:"Pyjamas", collection:"Holiday",
    price:28, originalPrice:35, badge:"Sale", color:"Star Print",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.9, reviews:432,
    details:["100% Fleece","Machine wash","Relaxed fit","Elasticated waist"],
    image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80",
  },
  {
    id:"k7", name:"Swim Shorts — Shark!", category:"Swimwear", collection:"Summer",
    price:20, originalPrice:null, badge:"New", color:"Ocean Blue",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.8, reviews:188,
    details:["100% Recycled Polyester","Quick dry","UV50+","Drawstring waist"],
    image:"https://images.unsplash.com/photo-1622201477339-a71bc8a6c6f7?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id:"k8", name:"Waterproof Puddle Jacket", category:"Jackets", collection:"New In",
    price:45, originalPrice:56, badge:"Sale", color:"Bright Yellow",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.7, reviews:243,
    details:["100% Polyester","Machine wash","Relaxed fit","Taped seams"],
    image:"https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id:"k9", name:"Sport & Play Leggings", category:"Shorts", collection:"Sport",
    price:16, originalPrice:null, badge:"New", color:"Electric Pink",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.6, reviews:130,
    details:["90% Poly 10% Elastane","Machine wash","Slim fit","4-way stretch"],
    image:"https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
  },
  {
    id:"k10", name:"Fun Dino Backpack", category:"Accessories", collection:"School",
    price:24, originalPrice:30, badge:"Sale", color:"Green",
    sizes:["One Size"],
    rating:4.8, reviews:376,
    details:["Polyester","Wipe clean","Padded back","Front zip pocket"],
    image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
  },
  {
    id:"k11", name:"Ribbed Cotton Trousers", category:"Trousers", collection:"School",
    price:20, originalPrice:25, badge:"Sale", color:"Navy",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.5, reviews:218,
    details:["100% Organic Cotton","Machine wash","Regular fit","Elasticated waist"],
    image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
  },
  {
    id:"k12", name:"Embroidered Cap", category:"Accessories", collection:"Summer",
    price:14, originalPrice:null, badge:"New", color:"Cream",
    sizes:["One Size"],
    rating:4.6, reviews:92,
    details:["100% Cotton","Wipe clean","Adjustable strap","UV protection"],
    image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&q=80",
  },
  {
    id:"k13", name:"Unicorn Graphic Sweatshirt", category:"Hoodies", collection:"New In",
    price:32, originalPrice:40, badge:"Sale", color:"Lilac",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.8, reviews:203,
    details:["80% Cotton 20% Poly","Machine wash","Regular fit","Kangaroo pocket"],
    image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
  },
  {
    id:"k14", name:"Floral Sundress", category:"Dresses", collection:"Summer",
    price:26, originalPrice:null, badge:"New", color:"Pink Floral",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.7, reviews:156,
    details:["100% Cotton","Machine wash","Regular fit","Elasticated waist"],
    image:"https://images.unsplash.com/photo-1519828159778-f2d6c51a1e17?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1512327428851-af740d946e17?w=600&q=80",
  },
  {
    id:"k15", name:"Wellies Rain Boot", category:"Shoes", collection:"New In",
    price:28, originalPrice:35, badge:"Sale", color:"Red",
    sizes:["4UK","6UK","8UK","10UK","12UK","1JN","3JN"],
    rating:4.8, reviews:284,
    details:["100% Natural rubber","Waterproof","Easy pull handles","Non-slip sole"],
    image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
  },
  {
    id:"k16", name:"Striped Long-Sleeve Tee", category:"T-Shirts", collection:"School",
    price:16, originalPrice:null, badge:null, color:"Navy Stripe",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.5, reviews:342,
    details:["100% Organic Cotton","Machine wash","Regular fit","Breton stripe"],
    image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&q=80",
  },
  {
    id:"k17", name:"Fleece Lined Hiking Boot", category:"Shoes", collection:"New In",
    price:48, originalPrice:60, badge:"Sale", color:"Brown & Tan",
    sizes:["4UK","6UK","8UK","10UK","12UK","1JN","3JN","5JN"],
    rating:4.7, reviews:121,
    details:["Synthetic leather","Fleece lining","Waterproof","Ankle support"],
    image:"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  },
  {
    id:"k18", name:"School Uniform Trousers", category:"Uniform", collection:"School",
    price:16, originalPrice:20, badge:"Sale", color:"Black",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.6, reviews:445,
    details:["65% Poly 35% Cotton","Machine wash","Regular fit","Belt loops"],
    image:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
  },
  {
    id:"k19", name:"Dinosaur Knitted Jumper", category:"Knitwear", collection:"New In",
    price:38, originalPrice:48, badge:"Sale", color:"Teal",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.9, reviews:167,
    details:["100% Cotton","Machine wash","Regular fit","3D dino motif"],
    image:"https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    id:"k20", name:"Beach Towel Poncho", category:"Swimwear", collection:"Summer",
    price:24, originalPrice:null, badge:"New", color:"Rainbow",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.7, reviews:89,
    details:["100% Cotton","Machine wash","Hooded design","Quick dry"],
    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    id:"k21", name:"Tie-Dye T-Shirt", category:"T-Shirts", collection:"Summer",
    price:18, originalPrice:24, badge:"Sale", color:"Coral Swirl",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.5, reviews:218,
    details:["100% Organic Cotton","Machine wash","Relaxed fit","Hand tie-dyed"],
    image:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
  },
  {
    id:"k22", name:"Football Kit Set", category:"Activewear", collection:"Sport",
    price:32, originalPrice:40, badge:"Sale", color:"Blue & White",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.8, reviews:312,
    details:["100% Polyester","Machine wash","Regular fit","Moisture-wicking"],
    image:"https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
  },
  {
    id:"k23", name:"Cosy Dressing Gown", category:"Pyjamas", collection:"Holiday",
    price:32, originalPrice:null, badge:"New", color:"Powder Blue",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y"],
    rating:4.8, reviews:134,
    details:["100% Fleece","Machine wash","Relaxed fit","Hood & pockets"],
    image:"https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
  },
  {
    id:"k24", name:"Quilted Puffer Jacket", category:"Jackets", collection:"New In",
    price:52, originalPrice:65, badge:"Sale", color:"Berry Purple",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.7, reviews:189,
    details:["100% Recycled filling","Machine wash","Regular fit","Packable"],
    image:"https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
  },
  {
    id:"k25", name:"Space Rocket Pyjama Set", category:"Pyjamas", collection:"Holiday",
    price:22, originalPrice:28, badge:"Sale", color:"Navy & Silver",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.9, reviews:267,
    details:["100% Cotton","Machine wash","Relaxed fit","Glow-in-dark print"],
    image:"https://images.unsplash.com/photo-1531401936279-1babd71c2e3a?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=600&q=80",
  },
  {
    id:"k26", name:"Lunch Box & Bottle Set", category:"Accessories", collection:"School",
    price:26, originalPrice:null, badge:"New", color:"Teal",
    sizes:["One Size"],
    rating:4.7, reviews:412,
    details:["BPA-free plastic","Dishwasher safe","Leak-proof bottle","Clip-lock lid"],
    image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
  },
  {
    id:"k27", name:"Girls Skirt & Top Set", category:"Dresses", collection:"Summer",
    price:30, originalPrice:38, badge:"Sale", color:"Coral & White",
    sizes:["2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"],
    rating:4.6, reviews:143,
    details:["100% Cotton","Machine wash","Regular fit","Matching set"],
    image:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
  },
  {
    id:"k28", name:"Active Zip Fleece", category:"Jackets", collection:"Sport",
    price:38, originalPrice:null, badge:"New", color:"Lime Green",
    sizes:["3-4y","4-5y","5-6y","6-7y","7-8y","9-10y","11-12y"],
    rating:4.6, reviews:98,
    details:["100% Polyester fleece","Machine wash","Regular fit","Side pockets"],
    image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    hoverImage:"https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80",
  },
];

const KIDS_TABS = [
  { label:"All", category:"All" },
  { label:"T-Shirts", category:"T-Shirts" },
  { label:"Shirts & Tops", category:"Shirts" },
  { label:"Hoodies", category:"Hoodies" },
  { label:"Knitwear", category:"Knitwear" },
  { label:"Dresses", category:"Dresses" },
  { label:"Trousers", category:"Trousers" },
  { label:"Shorts", category:"Shorts" },
  { label:"Jackets", category:"Jackets" },
  { label:"Activewear", category:"Activewear" },
  { label:"Shoes", category:"Shoes" },
  { label:"Accessories", category:"Accessories" },
  { label:"Pyjamas", category:"Pyjamas" },
  { label:"Swimwear", category:"Swimwear" },
  { label:"Uniform", category:"Uniform" },
];

const KIDS_SIDEBAR = {
  "Collections": [
    { label:"New In", category:"New In" },
    { label:"Back to School", category:"School" },
    { label:"Holiday Fun", category:"Holiday" },
    { label:"Sport & Play", category:"Sport" },
    { label:"Summer", category:"Summer" },
  ],
  "Shop by Category": [
    { label:"View All", category:"All" },
    { label:"T-Shirts", category:"T-Shirts" },
    { label:"Hoodies & Sweatshirts", category:"Hoodies" },
    { label:"Knitwear", category:"Knitwear" },
    { label:"Dresses & Sets", category:"Dresses" },
    { label:"Trousers & Jeans", category:"Trousers" },
    { label:"Shorts", category:"Shorts" },
    { label:"Jackets", category:"Jackets" },
    { label:"Activewear", category:"Activewear" },
    { label:"Shoes & Trainers", category:"Shoes" },
    { label:"Accessories", category:"Accessories" },
    { label:"Pyjamas", category:"Pyjamas" },
    { label:"Swimwear", category:"Swimwear" },
    { label:"School Uniform", category:"Uniform" },
  ],
};

const SIZE_CHARTS = {
  kids_clothing: {
    label:"Kids' Clothing",
    headers:["Age","Height (cm)","Chest (cm)","Waist (cm)"],
    rows:[["2–3 yrs","92–98","53–55","51–52"],["3–4 yrs","98–104","55–57","52–53"],["4–5 yrs","104–110","57–59","53–54"],["5–6 yrs","110–116","59–62","54–55"],["6–7 yrs","116–122","62–65","55–56"],["7–8 yrs","122–128","65–68","56–57"],["9–10 yrs","134–140","71–74","58–60"],["11–12 yrs","146–152","77–80","62–64"]],
  },
  kids_shoes: {
    label:"Kids' Shoes",
    headers:["UK","EU","US","Length (cm)"],
    rows:[["4","20","5","13.0"],["6","23","7","14.9"],["8","25","9","16.3"],["10","28","11","17.7"],["12","30","13","19.1"],["1 (junior)","33","1.5","20.9"],["3 (junior)","35","3.5","22.5"],["5 (junior)","38","6","24.0"]],
  },
};

const SORT_OPTIONS = [
  { value:"featured", label:"Featured" },
  { value:"price-asc", label:"Price: Low to High" },
  { value:"price-desc", label:"Price: High to Low" },
  { value:"rating", label:"Top Rated" },
  { value:"newest", label:"New Arrivals" },
];

function getCatCount(cat) {
  if (cat === "All") return KIDS_PRODUCTS.length;
  const collections = ["New In","School","Holiday","Sport","Summer"];
  if (collections.includes(cat)) return KIDS_PRODUCTS.filter(p => p.collection === cat).length;
  return KIDS_PRODUCTS.filter(p => p.category === cat).length;
}

/* ─── TICKER ─── */
function KidsTicker() {
  const items = ["Free Shipping Over £80","✦","New Kids' Arrivals Weekly","✦","Easy 30-Day Returns","✦","School Uniform 20% Off","✦","Fun Styles for All Ages","✦"];
  return (
    <div className="kids-ticker-bar">
      <div className="kids-ticker-track">
        {[...items,...items].map((t,i) => <span key={i} className={t === "✦" ? "kids-ticker-gem" : ""}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─── HERO ─── */
function KidsHero({ onShopCategory }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const start = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p+1) % KIDS_HERO_SLIDES.length), 5500);
  };
  useEffect(() => { start(); return () => clearInterval(timerRef.current); }, []);
  const goTo = (i) => { setActive(i); start(); };
  const prev = () => { setActive(p => (p-1+KIDS_HERO_SLIDES.length)%KIDS_HERO_SLIDES.length); start(); };
  const next = () => { setActive(p => (p+1)%KIDS_HERO_SLIDES.length); start(); };

  return (
    <div className="kids-hero">
      {KIDS_HERO_SLIDES.map((slide, i) => (
        <div key={i} className={`kids-hero-slide${active===i?" kids-hero-slide--active":""}`}>
          <img src={slide.img} alt={slide.title} />
          <div className="kids-hero-slide__overlay">
            {active===i && (
              <div className="kids-hero-caption">
                <div className="kids-hero-caption__tag">Kids' · {slide.eyebrow}</div>
                <h1 className="kids-hero-caption__title" style={{ whiteSpace:"pre-line" }}>{slide.title}</h1>
                <p className="kids-hero-caption__sub">{slide.sub}</p>
                <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
                  <button className="kids-hero-cta" onClick={() => onShopCategory(slide.category)}>
                    {slide.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  {slide.cta2 && <button className="kids-hero-cta2" onClick={() => onShopCategory("New In")}>{slide.cta2}</button>}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <button className="kids-hero-arrow kids-hero-arrow--prev" onClick={prev}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="kids-hero-arrow kids-hero-arrow--next" onClick={next}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div className="kids-hero-indicators">
        {KIDS_HERO_SLIDES.map((_,i) => (
          <button key={i} className={`kids-hero-indicator${active===i?" kids-hero-indicator--active":""}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}

/* ─── SIDEBAR ─── */
function KidsSidebar({ open, onClose, activeCategory, setActiveCategory, onGoHome }) {
  const handleClick = (cat) => { setActiveCategory(cat); onClose(); window.scrollTo({ top:0, behavior:"smooth" }); };
  if (!open) return null;
  return (
    <>
      <div className="kids-sidebar-overlay" onClick={onClose} />
      <aside className="kids-sidebar">
        <div className="kids-sidebar__header">
          <div className="kids-sidebar__title">Kids'</div>
          <button className="kids-sidebar__close" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <button className="kids-sidebar__home-btn" onClick={() => { onClose(); onGoHome(); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </button>
        <div className="kids-sidebar__divider" />
        {Object.entries(KIDS_SIDEBAR).map(([sectionTitle, items]) => (
          <div key={sectionTitle}>
            <div className="kids-sidebar__section-title">{sectionTitle}</div>
            {items.map(item => (
              <button
                key={item.category}
                className={`kids-sidebar__item${activeCategory===item.category?" kids-sidebar__item--active":""}`}
                onClick={() => handleClick(item.category)}
              >
                <span>{item.label}</span>
                <span className="kids-sidebar__item-count">{getCatCount(item.category)}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>
    </>
  );
}

/* ─── SIZE CHART ─── */
function KidsSizeChart({ onClose }) {
  const [tab, setTab] = useState("kids_clothing");
  const tabs = [{ key:"kids_clothing", label:"Clothing" }, { key:"kids_shoes", label:"Shoes" }];
  const chart = SIZE_CHARTS[tab];
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div className="kids-size-chart-backdrop" onClick={onClose}>
      <div className="kids-size-chart-modal" onClick={e => e.stopPropagation()}>
        <button className="kids-sc-close" onClick={onClose}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <h2>Size Guide</h2>
        <p className="kids-sc-subtitle">Kids' sizing. All measurements are approximate — kids grow at different rates, so check height too.</p>
        <div className="kids-sc-tabs">
          {tabs.map(t => <button key={t.key} className={`kids-sc-tab${tab===t.key?" kids-sc-tab--active":""}`} onClick={() => setTab(t.key)}>{t.label}</button>)}
        </div>
        <table className="kids-sc-table">
          <thead><tr>{chart.headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{chart.rows.map((row,i) => <tr key={i}>{row.map((cell,j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
        </table>
        <div className="kids-sc-note">
          💡 <strong>Tip:</strong> Check both age AND height/chest. If between sizes, size up for room to grow.
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function KidsProductCard({ product, onClick, style }) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isWished = isWishlisted(product.id);
  const discount = product.originalPrice ? Math.round((1-product.price/product.originalPrice)*100) : null;

  return (
    <div className="kids-card" style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="kids-card__img-wrap" onClick={onClick}>
        <img src={hovered && product.hoverImage ? product.hoverImage : product.image} alt={product.name} className="kids-card__img" />
        {product.badge && <span className={`kids-card__badge kids-card__badge--${product.badge.toLowerCase()}`}>{product.badge}</span>}
        {discount && <span className="kids-card__discount">-{discount}%</span>}
        <div className="kids-card__overlay">
          <button className="kids-card__quick-btn" onClick={onClick}>Quick View</button>
        </div>
        <button
          className={`kids-card__wish${isWished?" kids-card__wish--active":""}`}
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="kids-card__info">
        <div className="kids-card__age-tag">Kids'</div>
        <div className="kids-card__name" onClick={onClick}>{product.name}</div>
        <div className="kids-card__color">{product.color}</div>
        <div className="kids-card__footer">
          {product.originalPrice
            ? <><span className="kids-card__price kids-card__sale-price">£{product.price}</span><span className="kids-card__original">£{product.originalPrice}</span></>
            : <span className="kids-card__price">£{product.price}</span>}
        </div>
        <div className="kids-card__rating">
          {Array(5).fill(null).map((_,i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i<Math.round(product.rating)?"var(--kids-accent)":"none"} stroke="var(--nude-300)" strokeWidth="1.5">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          ))}
          <span className="kids-card__rating-text">{product.rating} ({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT MODAL ─── */
function KidsProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);
  const [added, setAdded] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { setCartOpen } = useDrawer();
  const isWished = isWishlisted(product.id);
  const discount = product.originalPrice ? Math.round((1-product.price/product.originalPrice)*100) : null;

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart({ ...product, selectedSize, section:"kids" }, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); setCartOpen(true); }, 1400);
  };

  return (
    <>
      <div className="kids-modal-backdrop" onClick={onClose}>
        <div className="kids-modal" onClick={e => e.stopPropagation()}>
          <button className="kids-modal__close" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div className="kids-modal__inner">
            <div className="kids-modal__gallery">
              <div className="kids-modal__main-img-wrap">
                <img src={activeImg} alt={product.name} className="kids-modal__main-img" />
              </div>
              <div className="kids-modal__thumbs">
                {[product.image, product.hoverImage].filter(Boolean).map((img,i) => (
                  <button key={i} className={`kids-modal__thumb${activeImg===img?" kids-modal__thumb--active":""}`} onClick={() => setActiveImg(img)}>
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="kids-modal__info">
              <div>
                <div className="kids-modal__cat">{product.category}</div>
                <div className="kids-modal__rating">
                  {Array(5).fill(null).map((_,i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i<Math.round(product.rating)?"var(--kids-accent)":"none"} stroke="var(--nude-300)" strokeWidth="1.5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                  <span className="kids-modal__rating-text">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
              <h2 className="kids-modal__name">{product.name}</h2>
              <div className="kids-modal__price-row">
                <span className="kids-modal__price">£{product.price}</span>
                {product.originalPrice && <><span className="kids-modal__original">£{product.originalPrice}</span><span className="kids-modal__save">Save {discount}%</span></>}
              </div>
              <p style={{ fontSize:"13px", color:"var(--text-light)" }}>Colour: <strong style={{ color:"var(--text-mid)" }}>{product.color}</strong></p>
              <div>
                <div className="kids-modal__sizes-label">Size {selectedSize ? `— ${selectedSize}` : ""}</div>
                <div className="kids-modal__sizes">
                  {product.sizes.map(s => (
                    <button key={s} className={`kids-modal__size-btn${selectedSize===s?" kids-modal__size-btn--active":""}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
                {!selectedSize && <p className="kids-modal__size-hint">Please select a size to continue</p>}
                <span className="kids-modal__size-chart-link" onClick={() => setSizeChartOpen(true)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 6 8 2"/></svg>
                  View Size Guide
                </span>
              </div>
              <div className="kids-modal__actions">
                <div className="kids-modal__qty">
                  <button onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty+1)}>+</button>
                </div>
                <button className={`kids-modal__add-btn${added?" kids-modal__add-btn--added":""}`} onClick={handleAdd} disabled={!selectedSize}>
                  {added
                    ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>Added!</>
                    : "Add to Cart"}
                </button>
                <button className={`kids-modal__wish-btn${isWished?" kids-modal__wish-btn--active":""}`} onClick={() => toggleWishlist(product)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <div style={{ borderTop:"1px solid var(--nude-100)", paddingTop:"15px" }}>
                <div className="kids-modal__details-title">Product Details</div>
                <ul className="kids-modal__details-list">
                  {product.details.map((d,i) => (
                    <li key={i}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--kids-accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="kids-modal__shipping">
                <div className="kids-modal__shipping-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kids-accent)" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Free shipping on orders over £80
                </div>
                <div className="kids-modal__shipping-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kids-accent)" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.49"/></svg>
                  Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {sizeChartOpen && <KidsSizeChart onClose={() => setSizeChartOpen(false)} />}
    </>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Kids({ onGoHome }) {
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
    const collections = ["New In","School","Holiday","Sport","Summer"];
    let list = KIDS_PRODUCTS;
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
    <div className="kids-shop-page">
      <KidsTicker />

      {showHero && <KidsHero onShopCategory={handleShopCategory} />}

      <KidsSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => { setActiveCategory(cat); setShowHero(false); }}
        onGoHome={onGoHome}
      />

      {!showHero && (
        <div className="kids-breadcrumb">
          <a onClick={() => { setShowHero(true); setActiveCategory("All"); }}>Home</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          <a onClick={() => setActiveCategory("All")}>Kids'</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          <span>{activeCategory === "All" ? "All Products" : activeCategory}</span>
        </div>
      )}

      <div className="kids-tabs-bar">
        <div className="kids-tabs-inner">
          <button className="kids-filter-btn" onClick={() => setSidebarOpen(true)} style={{ marginRight:"12px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
            Filter
          </button>
          {KIDS_TABS.map(tab => (
            <button
              key={tab.category}
              className={`kids-tab${activeCategory===tab.category?" kids-tab--active":""}`}
              onClick={() => { setActiveCategory(tab.category); setShowHero(false); window.scrollTo({top:0,behavior:"smooth"}); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="kids-main-content">
        <div className="kids-toolbar">
          <div className="kids-count">Showing <strong>{filtered.length}</strong> product{filtered.length!==1?"s":""}</div>
          <div className="kids-controls">
            <div className="kids-grid-toggle">
              {[2,3,4].map(n => (
                <button key={n} className={`kids-grid-btn${gridCols===n?" kids-grid-btn--active":""}`} onClick={() => setGridCols(n)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    {n===2 && <><rect x="0" y="0" width="6" height="14" rx="1"/><rect x="8" y="0" width="6" height="14" rx="1"/></>}
                    {n===3 && <><rect x="0" y="0" width="3.5" height="14" rx="1"/><rect x="5.25" y="0" width="3.5" height="14" rx="1"/><rect x="10.5" y="0" width="3.5" height="14" rx="1"/></>}
                    {n===4 && <><rect x="0" y="0" width="2.5" height="14" rx="1"/><rect x="3.8" y="0" width="2.5" height="14" rx="1"/><rect x="7.6" y="0" width="2.5" height="14" rx="1"/><rect x="11.4" y="0" width="2.5" height="14" rx="1"/></>}
                  </svg>
                </button>
              ))}
            </div>
            <label className="kids-sale-toggle">
              <input type="checkbox" checked={saleOnly} onChange={e => setSaleOnly(e.target.checked)} />
              <span className="kids-sale-toggle__track" />
              <span className="kids-sale-toggle__label">Sale Only</span>
            </label>
            <div className="kids-sort-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              <select className="kids-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={`kids-products-grid kids-products-grid--${gridCols}`}>
            {filtered.map((p,i) => (
              <KidsProductCard
                key={p.id}
                product={p}
                onClick={() => setSelectedProduct(p)}
                style={{ animationDelay:`${i*0.04}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="kids-empty">
            <div className="kids-empty__title">No products found</div>
            <div className="kids-empty__sub">Try a different category or clear your filters.</div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <KidsProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}