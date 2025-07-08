import React, { useState } from "react";
import "./Cart.css";
import axios from "axios";

function Cart({ cart, removeFromCart }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrderClick = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleConfirmOrder = async () => {
    if (!address || !phone) {
      alert("Please enter both address and phone number.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first to place an order.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: [selectedItem],
        address,
        phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Order placed successfully!");
      setShowForm(false);
      setAddress("");
      setPhone("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Order failed!");
    }
  };

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, i) => (
              <li key={i} className="cart-item">
                <span>{item.name} - ₹{item.price}</span>
                <button onClick={() => removeFromCart(i)} className="remove-btn">
                  Remove
                </button>
                <button
                  onClick={() => handlePlaceOrderClick(item)}
                  className="order-btn"
                  style={{ marginLeft: "10px" }}
                >
                  Place Order
                </button>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ₹{total}</p>
        </>
      )}

      {showForm && (
        <div className="popup-form">
          <h4>Enter Delivery Details</h4>
          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          /><br />
          <button onClick={handleConfirmOrder}>✅ Confirm Order</button>
          <button onClick={() => setShowForm(false)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
