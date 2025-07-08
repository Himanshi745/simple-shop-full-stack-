import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("Sending data:", { name, email, password });


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://simple-shop-nstj.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("✅ Registered successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("❌ Registration failed!");
    }
  };

  return (
    <div class="regi">
        <form onSubmit={handleRegister} style={{ padding: "2rem" }}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br /><br/>
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
          <button type="submit">Register</button>
        </form>
    </div>
    
  );
}

export default RegisterPage;
