// App.js
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./components/products";
import Cart from "./components/Cart";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import axios from "axios";
import CheckoutPage from "./pages/CheckoutPage";

const AppContent = () => {
  const location = useLocation();

const [cart, setCart] = useState([]);
console.log(cart);

  const [cartItems, setCartItems] = useState([]);
  const watchesRef = useRef(null);
  const shoesRef = useRef(null);
  const backpacksRef = useRef(null);
  const cartRef = useRef(null);

  const scrollToCategory = useCallback((category) => {
  const categoryRefs = {
    watches: watchesRef,
    shoes: shoesRef,
    backpacks: backpacksRef,
    cart: cartRef,
  };
  const ref = categoryRefs[category];
  if (ref?.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
}, []);
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const category = params.get("scrollTo");
  if (category) {
    scrollToCategory(category);
  }
}, [location.search, scrollToCategory]); // ✅ No more warning


  // Scroll when redirected to "/" from another page
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  scrollToCategory();
}, [scrollToCategory]);



  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  
  const handlePlaceOrder = async () => {
    const address = prompt("Enter delivery address:");
    const phone = prompt("Enter phone number:");

    if (!address || !phone) {
      alert("Address and phone are required!");
      return;
    }

  const token = localStorage.getItem("token");
  if (!token) return alert("Please login to place an order.");
    try {
      const res = await axios.post(
        "https://simple-shop-nstj.onrender.com/api/...",
        { items: [Cart],
          address,
          phone,
         },
        { headers: { 
          Authorization: `Bearer ${token}`,
         },
         }
      );
      alert("✅ Order placed successfully!");
      alert(res.data.message);
      setCartItems([]);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Order placement failed. \n ⚠️ Please login first to place an order. ");
    }
  };

  const groupedProducts = {
    watches: products.filter((p) => p.category === "watches"),
    shoes: products.filter((p) => p.category === "shoes"),
    backpacks: products.filter((p) => p.category === "backpacks"),
  };

  return (
    <div className="app">
      <Navbar scrollToCategory={scrollToCategory} cartCount={cartItems.length} />
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="home">
              <div className="center-welcome">
                <h1>Welcome to <strong>SimpleShop</strong></h1>
                <p>Scroll down or use navbar to explore categories.</p>
              </div>

              {Object.entries(groupedProducts).map(([cat, items]) => (
                <div
                  key={cat}
                  ref={cat === "watches" ? watchesRef : cat === "shoes" ? shoesRef : backpacksRef}
                  className="category-section"
                >
                  <h2>{cat.toUpperCase()}</h2>
                  <div className="products">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <Route
          path="/orders"
          element={
            <OrdersPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              handlePlaceOrder={handlePlaceOrder}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {(location.pathname === "/" || location.pathname === "/orders") && (
        <div ref={cartRef}>
          <Cart cart={cartItems} removeFromCart={removeFromCart} setCart={setCart} handlePlaceOrder={handlePlaceOrder} />
          {cartItems.length > 0 && location.pathname === "/" && (
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router basename="/simple-shop">
      <AppContent />
      {/* Your Routes */}
    </Router>
  );
}
