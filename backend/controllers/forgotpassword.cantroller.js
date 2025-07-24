import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import Chef from "../models/Chef.js";
import Admin from "../models/admin.js";
import dotenv from "dotenv";
dotenv.config();
// 🔁 Utility to get model based on role
const getModelByRole = (role) => {
  if (role === "user") return User;
  if (role === "chef") return Chef;
  if (role === "admin") return Admin;
  return null;
};

// ✅ Step 1: Send Reset Link to Email
export const forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role)
    return res.status(400).json({ message: "Email and role required" });

  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // 10 minutes
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}?role=${role}`;

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tiffintalesh@gmail.com",
        pass: "regf tlvj cxfi hpwg", // Use App Password (not real password)
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "🔐 Reset Your Password",
      html: `
        <h3>Hello, From tiffin tales</h3>
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({ message: "Reset link sent to email!" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// ✅ Step 2: Reset Password via Token
export const resetPassword = async (req, res) => {
  const { token, role, newPassword } = req.body;

  if (!token || !role || !newPassword)
    return res
      .status(400)
      .json({ message: "Token, role, and new password are required" });

  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  try {
    const user = await Model.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};
