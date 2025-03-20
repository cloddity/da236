const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true, 
    min: 0.1, 
  },
  quantity: {
    type: Number,
    required: true,
    default: 0, 
    min: 0,
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'books', 'other'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
