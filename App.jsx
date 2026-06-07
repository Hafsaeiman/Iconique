import { useDrawer } from "./context/ShopContext";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";

import Bags from "./pages/Bags";
import Jewelry from "./pages/Jewelry";
import Shoes from "./pages/Shoes";

import Login from "./components/Login";
import Signup from "./components/Signup";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";   // ← NEW

import ReviewForm from "./components/ReviewForm";
import ContactForm from "./components/ContactForm";
import Trackorder from "./components/Trackorder";

function AppContent() {
  const location = useLocation();
  const { cartOpen, wishlistOpen } = useDrawer();

  const hideLayout =
    location.pathname === "/login"   ||
    location.pathname === "/signup"  ||
    location.pathname === "/order-success"; // clean full-page feel

  return (
    <div className="app">
      {!hideLayout && <Navbar />}

      {/* Global Drawers — conditionally rendered */}
      {cartOpen     && <CartDrawer />}
      {wishlistOpen && <WishlistDrawer />}

      <main className="app__main">
        <Routes>
          {/* Home */}
          <Route path="/"              element={<Home />} />

          {/* Categories */}
          <Route path="/women"         element={<Women />} />
          <Route path="/men"           element={<Men />} />
          <Route path="/kids"          element={<Kids />} />
          <Route path="/bags"          element={<Bags />} />
          <Route path="/jewelry"       element={<Jewelry />} />
          <Route path="/shoes"         element={<Shoes />} />

          {/* Auth */}
          <Route path="/login"         element={<Login />} />
          <Route path="/signup"        element={<Signup />} />

          {/* Checkout flow */}
          <Route path="/checkout"      element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />   {/* ← NEW */}

          {/* Forms */}
          <Route path="/reviews"       element={<ReviewForm />} />
          <Route path="/contact"       element={<ContactForm />} />
          <Route path="/trackorder"    element={<Trackorder />} />

          {/* Fallback cart page */}
          <Route
            path="/cart"
            element={
              <div style={{ padding: "80px", textAlign: "center" }}>
                <h1>🛒 Cart Page</h1>
                <p>Your shopping cart is empty.</p>
              </div>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </Router>
  );
}