// pages/OrdersPage.js
import React from "react";

const OrdersPage = ({ cartItems, handlePlaceOrder }) => {
  return (
    <div className="orders-page" style={{ padding: "2rem" }}>
      <h2>Your Orders</h2>
      {cartItems.length > 0 ? (
        <button onClick={handlePlaceOrder} className="place-order-btn">
          Place Order
        </button>
      ) : (
        <p>No items in cart to order.</p>
      )}
    </div>
  );
};

export default OrdersPage;
