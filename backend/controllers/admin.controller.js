
// controllers/adminController.js
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, passwordHash, role });
    await admin.save();

    res.status(201).json({ message: "Admin registered", admin: { username: admin.username, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: "Error in register", error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { username: admin.username, role: admin.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Error in login", error: err.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-passwordHash");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Error getting admins", error: err.message });
  }
};
