const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log('Received data:', req.body); 

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.'});
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
    res.status(201).json({ message: 'User registered successfully.', user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in.' });
  }
};

module.exports = { registerUser, loginUser };
