const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  quantity: Number,
  trackingId: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Shipping", shippingSchema);