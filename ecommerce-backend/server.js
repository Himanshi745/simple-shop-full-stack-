const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();

// ✅ Apply CORS before any routes
app.use(cors({
  origin: "https://e-commerce-frontend-ijk2.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// ✅ Parse JSON before routes
app.use(express.json());

// ✅ Register routes AFTER middlewares
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend API is running successfully!");
});

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
