const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error:', err);
});

module.exports = connectDB;