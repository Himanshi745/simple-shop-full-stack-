import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ scrollToCategory, cartCount }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (location.pathname === "/") {
      // Already on homepage — scroll to category
      scrollToCategory && scrollToCategory(category);
    } else {
      // Navigate to homepage, then trigger scroll after load
      navigate(`/?scrollTo=${category}`);
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = () => {
    if (location.pathname === "/") {
      scrollToCategory && scrollToCategory("cart");
    } else {
      navigate("/?scrollTo=cart");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 className="logo" onClick={goHome} style={{ cursor: "pointer" }}>
          🛍️ SimpleShop
        </h2>
      </Link>

      <ul className="nav-links">
        <li onClick={() => handleCategoryClick("watches")}>Watches</li>
        <li onClick={() => handleCategoryClick("shoes")}>Shoes</li>
        <li onClick={() => handleCategoryClick("backpacks")}>Backpacks</li>

        <li>
          <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }}>
            Orders
          </Link>
        </li>

        <li>
          <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
            Login
          </Link>
        </li>

        <li>
          <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
            Register
          </Link>
        </li>

        <li onClick={handleCartClick} style={{ cursor: "pointer" }}>
          🛒 <span>{cartCount}</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
