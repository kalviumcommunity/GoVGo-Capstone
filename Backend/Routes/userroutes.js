const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, mobileNumber, password, otp, createdAt } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // 🔥 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      mobileNumber: String(mobileNumber),
      password: hashedPassword, // Save hashed password
      otp: String(otp),
      createdAt
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ error: 'Error registering User :(' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ Generate JWT Token after successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret_key', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ✅ Get All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password -otp'); // Exclude sensitive fields
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// ✅ Update User Info
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, email, mobileNumber, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = String(mobileNumber);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'User updated successfully!', user });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Error updating user' });
  }
});

module.exports = router;
