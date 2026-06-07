import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

/* ─── SAMPLE PRODUCTS (shared across app) ─── */
export const PRODUCTS = [
  { id:"p1",  name:"Silk Drape Midi Dress",    category:"Dresses",    price:189, badge:"Sale", color:"Champagne",    image:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=120&q=80" },
  { id:"p2",  name:"Linen Wrap Blazer",         category:"Outerwear",  price:215, badge:"New",  color:"Warm Sand",    image:"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=120&q=80" },
  { id:"p3",  name:"Cashmere Ribbed Knit",      category:"Tops",       price:145, badge:"Sale", color:"Blush Rose",   image:"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=120&q=80" },
  { id:"p4",  name:"Suede Block Heel Mule",     category:"Shoes",      price:165, badge:"New",  color:"Camel",        image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&q=80" },
  { id:"p5",  name:"Pleated Maxi Skirt",        category:"Skirts",     price:128, badge:"Sale", color:"Ivory",        image:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=120&q=80" },
  { id:"p6",  name:"Oversized Trench Coat",     category:"Outerwear",  price:340,               color:"Caramel",      image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&q=80" },
  { id:"p7",  name:"Satin Camisole Top",        category:"Tops",       price:79,  badge:"Sale", color:"Pearl",        image:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&q=80" },
  { id:"p8",  name:"Leather Tote Bag",          category:"Accessories",price:295, badge:"New",  color:"Tan",          image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&q=80" },
  { id:"p9",  name:"Wrap Midi Dress",           category:"Dresses",    price:156, badge:"Sale", color:"Terracotta",   image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&q=80" },
  { id:"p10", name:"High-Rise Straight Jeans",  category:"Jeans",      price:139, badge:"Sale", color:"Mid Wash",     image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=120&q=80" },
  { id:"p11", name:"Yoga Flow Leggings",        category:"Activewear", price:88,  badge:"Sale", color:"Charcoal",     image:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&q=80" },
  { id:"p12", name:"Pearl Drop Earrings",       category:"Accessories",price:48,  badge:"New",  color:"Pearl & Gold", image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&q=80" },
{
  id:"x1",
  name:"Classic Black Hoodie",
  category:"Hoodies",
  price:89,
  badge:"New",
  color:"Black",
  image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=120&q=80"
},
{
  id:"x2",
  name:"Premium Denim Jacket",
  category:"Jackets",
  price:149,
  badge:"Sale",
  color:"Blue",
  image:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&q=80"
},
{
  id:"x3",
  name:"Cotton Oversized Tee",
  category:"T-Shirts",
  price:35,
  badge:"New",
  color:"White",
  image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&q=80"
},
{
  id:"x4",
  name:"Running Sneakers",
  category:"Shoes",
  price:120,
  badge:"Best Seller",
  color:"Grey",
  image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80"
},
{
  id:"x5",
  name:"Leather Crossbody Bag",
  category:"Accessories",
  price:165,
  badge:"New",
  color:"Brown",
  image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=120&q=80"
},
{
  id:"x6",
  name:"Relaxed Fit Sweatshirt",
  category:"Sweatshirts",
  price:69,
  badge:"New",
  color:"Heather Grey",
  image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=120&q=80"
},
{
  id:"x7",
  name:"Slim Fit Formal Shirt",
  category:"Shirts",
  price:79,
  badge:"Sale",
  color:"White",
  image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=120&q=80"
},
{
  id:"x8",
  name:"Canvas Weekend Backpack",
  category:"Bags",
  price:95,
  badge:"New",
  color:"Olive",
  image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&q=80"
},
{
  id:"x9",
  name:"Chunky Platform Sneakers",
  category:"Shoes",
  price:135,
  badge:"Best Seller",
  color:"White",
  image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&q=80"
},
{
  id:"x10",
  name:"Minimal Gold Bracelet",
  category:"Jewelry",
  price:55,
  badge:"New",
  color:"Gold",
  image:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=120&q=80"
},
{
  id:"x11",
  name:"Tailored Wide Leg Pants",
  category:"Trousers",
  price:110,
  badge:"Sale",
  color:"Beige",
  image:"https://images.unsplash.com/photo-1506629905607-d9f9d42d1f64?w=120&q=80"
},
{
  id:"x12",
  name:"Floral Summer Dress",
  category:"Dresses",
  price:125,
  badge:"New",
  color:"Pink",
  image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&q=80"
},
{
  id:"x13",
  name:"Premium Leather Loafers",
  category:"Shoes",
  price:175,
  badge:"New",
  color:"Dark Brown",
  image:"https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=120&q=80"
},
{
  id:"x14",
  name:"Athletic Performance Shorts",
  category:"Activewear",
  price:42,
  badge:"Sale",
  color:"Black",
  image:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&q=80"
},
{
  id:"x15",
  name:"Luxury Silk Scarf",
  category:"Accessories",
  price:65,
  badge:"New",
  color:"Navy",
  image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=120&q=80"
},
{
  id:"x16",
  name:"Vintage Denim Jeans",
  category:"Jeans",
  price:98,
  badge:"Best Seller",
  color:"Blue",
  image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=120&q=80"
},
{
  id:"x17",
  name:"Oversized Wool Coat",
  category:"Outerwear",
  price:299,
  badge:"Sale",
  color:"Camel",
  image:"https://images.unsplash.com/photo-1520975954732-35dd22299614?w=120&q=80"
},
{
  id:"x18",
  name:"Diamond Stud Earrings",
  category:"Jewelry",
  price:240,
  badge:"New",
  color:"Silver",
  image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&q=80"
},
{
  id:"x19",
  name:"Kids Adventure Hoodie",
  category:"Kids",
  price:38,
  badge:"New",
  color:"Royal Blue",
  image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=120&q=80"
},
{
  id:"x20",
  name:"Travel Duffel Bag",
  category:"Bags",
  price:145,
  badge:"Best Seller",
  color:"Khaki",
  image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&q=80"
}
];

// const DEMO_CART = [
//   { ...PRODUCTS[0], selectedSize: "S", qty: 1 },
//   { ...PRODUCTS[5], selectedSize: "M", qty: 2 },
// ];
const DEMO_CART = PRODUCTS.length >= 6 ? [
  { ...PRODUCTS[0], selectedSize: "S", qty: 1 },
  { ...PRODUCTS[5], selectedSize: "M", qty: 2 },
] : [];

/* ─── CART CONTEXT ─── */
const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <ShopProvider>");
  return ctx;
}

/* ─── WISHLIST CONTEXT ─── */
const WishlistContext = createContext(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <ShopProvider>");
  return ctx;
}

/* ─── DRAWER CONTEXT ─── */
const DrawerContext = createContext(null);

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside <ShopProvider>");
  return ctx;
}

/* ─── NOTIFICATION CONTEXT ─── */
const NotificationContext = createContext(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside <ShopProvider>");
  return ctx;
}

/* ─── COMBINED PROVIDER ─── */
export function ShopProvider({ children }) {
//   useEffect(() => {
//   fetchWishlist();
// }, []);

const fetchWishlist = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await axios.get(
      "http://localhost:5000/api/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWishlist(res.data.wishlist || []);
  } catch (err) {
    console.error("Wishlist Load Error:", err);
  }
};
  // Cart
  const [cart, setCart] = useState(DEMO_CART);
  const [cartOpen, setCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Notification
  const [notification, setNotification] = useState(null);
useEffect(() => {
  fetchWishlist();
}, []);

  /* ── Cart helpers ── */
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(
        i => i.id === product.id && i.selectedSize === product.selectedSize
      );
      if (ex)
        return prev.map(i =>
          i.id === product.id && i.selectedSize === product.selectedSize
            ? { ...i, qty: i.qty + qty }
            : i
        );
      return [...prev, { ...product, qty }];
    });
    showNotification(`${product.name} added to bag!`, "success");
  };

  const removeFromCart = (id, size) =>
    setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === size)));

  const updateQty = (id, size, delta) =>
    setCart(prev =>
      prev.map(i =>
        i.id === id && i.selectedSize === size
          ? { ...i, qty: Math.max(1, i.qty + delta) }
          : i
      )
    );

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* ── Wishlist helpers ── */
  
  const toggleWishlist = async (product) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      showNotification("Please login first", "warn");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/wishlist/toggle",
      {
productId: product.id,        
name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        color: product.color,
        badge: product.badge,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWishlist(res.data.wishlist);

    if (res.data.action === "added") {
      showNotification(`${product.name} saved to wishlist ♡`, "wish");
    } else {
      showNotification(`${product.name} removed from wishlist`, "info");
    }
  } catch (err) {
    console.error("Wishlist Error:", err);
    showNotification("Failed to update wishlist", "warn");
  }
};
const clearWishlist = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      "http://localhost:5000/api/wishlist/clear",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setWishlist([]);
  } catch (err) {
    console.error(err);
  }
};

const isWishlisted = id =>
  wishlist.some(p => p.productId === id);
  /* ── Notification helpers ── */
  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type, id: Date.now() });
    setTimeout(() => setNotification(null), 2600);
  };

  return (
    <CartContext.Provider
      value={{
        cart, setCart,
        addToCart, removeFromCart, updateQty, clearCart,
        cartCount, cartTotal,
      }}
    >
      <WishlistContext.Provider
        value={{
  wishlist,
  setWishlist,
  toggleWishlist,
  clearWishlist,
  fetchWishlist,
  isWishlisted,
  wishCount: wishlist.length,
}}
      >
        <DrawerContext.Provider
          value={{
            cartOpen, setCartOpen,
            wishlistOpen, setWishlistOpen,
          }}
        >
          <NotificationContext.Provider value={{ notification, showNotification }}>
            {children}
            {/* Global toast */}
            {notification && (
              <div
                key={notification.id}
                style={{
                  position: "fixed",
                  bottom: 28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 9999,
                  background:
                    notification.type === "wish" ? "#c084fc" :
                    notification.type === "info" ? "#64748b" :
                    notification.type === "warn" ? "#f59e0b" :
                    "#242524",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: 50,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                  animation: "toastIn 0.3s ease",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {notification.msg}
              </div>
            )}
          </NotificationContext.Provider>
        </DrawerContext.Provider>
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}