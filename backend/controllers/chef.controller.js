import Chef from "../models/Chef.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * ✅ Register a New Chef
 * @route POST /api/chefs/register
 */
export const registerChef = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      passwordHash,
      bio,
      cuisine,
      kitchenImages,
      documents,
      bankDetails,
      location
    } = req.body;

    // ✅ Check Required Fields
    if (!name || !email || !phone || !passwordHash || !cuisine || !documents || !bankDetails || !location) {
      return res.status(400).json({
        message: "Required fields are missing",
        required: ["name", "email", "phone", "passwordHash"]
      });
    }

    // ✅ Check if Email Already Exists
    const existingChef = await Chef.findOne({ email });
    if (existingChef) {
      return res.status(400).json({ message: "Chef already exists with this email" });
    }

    // ✅ Password Hash
    const newPassword= await bcrypt.hash(passwordHash, 10);

    // ✅ Create New Chef
    const newChef = new Chef({
      name,
      email,
      phone,
      passwordHash: newPassword,
      bio: bio || "",
      cuisine,
      kitchenImages,
      documents,
      bankDetails,
      location
    });

    await newChef.save();

    // ✅ JWT Token Generate
    const token = jwt.sign(
      { id: newChef._id, role: "chef" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Chef registered successfully",
      token,
      chef: {
        _id: newChef._id,
        name: newChef.name,
        email: newChef.email
      }
    });
  } catch (err) {
    console.error("Register Chef Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




/**
 * ✅ Login Chef
 * @route POST /api/chefs/login
 */
export const loginChef = async (req, res) => {
  try {
    const { email, passwordHash } = req.body;

    if (!email || ! passwordHash)
      return res.status(400).json({ message: "Email and password are required" });

    const chef = await Chef.findOne({ email });
    if (!chef)
      return res.status(404).json({ message: "No chef found with this email" });

    const isMatch = await bcrypt.compare( passwordHash, chef.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: chef._id, role: "chef" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      chef: {
        _id: chef._id,
        name: chef.name,
        email: chef.email
      }
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find({ isVerified: true }).select("-passwordHash");
    res.status(200).json(chefs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chefs", error: err.message });
  }
};


/**
 * ✅ Get Chef By ID
 * @route GET /api/chefs/:id
 */
export const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id).select("-passwordHash");

    if (!chef)
      return res.status(404).json({ message: "Chef not found" });

    res.status(200).json(chef);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chef", error: err.message });
  }
};



/**
 * 
 * @route DELETE /api/chefs/:id
 */
export const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);

    if (!chef)
      return res.status(404).json({ message: "Chef not found to delete" });

    res.status(200).json({ message: "Chef deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting chef", error: err.message });
  }
};
