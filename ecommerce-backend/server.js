const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();

// ✅ Apply CORS before any routes
app.use(cors({
  origin: "https://himanshi745.github.io/simple-shop/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Parse JSON before routes
app.use(express.json());

// ✅ Register routes AFTER middlewares
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ✅ MongoDB Connection and Server Start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

startServer();
