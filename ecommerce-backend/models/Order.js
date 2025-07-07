// models/Order.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [itemSchema],
  address: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;