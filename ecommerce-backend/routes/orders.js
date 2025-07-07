const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// POST /api/orders
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.userId; // from middleware
    const { items, address, phone } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    if (!address || !phone) {
      return res.status(400).json({ message: "Address and phone are required." });
    }

    const order = new Order({ user: userId, items,address, phone, date: new Date() });
    await order.save();

    res.status(201).json({ message: "Order placed successfully!", orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order placement failed." });
  }
});

// GET /api/orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders." });
  }
});

module.exports = router;
