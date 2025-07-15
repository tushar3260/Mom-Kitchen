import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User SignUp
export const UserSignUp = async (req, res) => {
  const { fullName, email, passwordHash, phone, address } = req.body;
  if (!fullName || !email || !passwordHash || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);
    const user = new User({ fullName, email, passwordHash: hashedPassword, phone, address });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered", user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// User Login
export const UserLogin = async (req, res) => {
  const { email, passwordHash } = req.body;
  if (!email || !passwordHash) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Blocked check
    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all users
export const getallUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// ✅ Toggle block/unblock status (admin-only)
export const toggleBlockStatus = async (req, res) => {
  const { id } = req.params;
  const { isBlocked } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked },
      { new: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user status", error: err.message });
  }
};
