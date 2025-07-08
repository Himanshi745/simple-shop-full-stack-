import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please enter both address and phone number!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place order.");
      navigate("/login");
      return;
    }

    try {
      setIsPlacingOrder(true);
      await axios.post("https://simple-shop-nstj.onrender.com", {
        items: [product],
        address,
        phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Order placement failed.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Checkout</h2>
      {product ? (
        <>
          <img src={product.image} alt={product.name} width="150" />
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>

          <br />
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handlePlaceOrder} disabled={isPlacingOrder}>
            {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
          </button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
