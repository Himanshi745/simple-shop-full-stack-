import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://simple-shop-nstj.onrender.com", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");
      navigate("/"); // redirect to homepage or dashboard
    } catch (err) {
      console.error(err);
      alert("❌ Login failed! Invalid credentials.");
    }
  };

  return (
    <div class="regi">
      <form onSubmit={handleLogin} style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br/>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
    
    
  );
}

export default LoginPage;
