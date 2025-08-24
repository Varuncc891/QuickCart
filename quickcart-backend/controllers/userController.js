const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required');

/**
 * Handles new user registration with email validation and password hashing
 * Returns JWT token upon successful registration
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign(
      { userId: user._id, role: 'user' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * Authenticates existing users by comparing hashed passwords
 * Issues new JWT token upon successful login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: 'user' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ 
      token,
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { registerUser, loginUser };