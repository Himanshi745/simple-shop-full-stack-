import React from "react";
import { useNavigate } from "react-router-dom";


function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/checkout", { state: { product } }); // Pass product to checkout page
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={handleBuyNowClick}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
