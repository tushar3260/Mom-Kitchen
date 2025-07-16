import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Admin from '../models/admin.js';
import User from '../models/User.js';
import Chef from '../models/Chef.js';

// Temporary in-memory OTP store (for demo purposes; use DB in production)
const otpStore = {};

// Utility function to select model based on role
const getModelByRole = (role) => {
  const models = {
    admin: Admin,
    user: User,
    chef: Chef,
  };
  return models[role] || null;
};

// Controller to send OTP
export const sendOTP = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: 'Email and role are required.' });
  }

  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: 'Invalid role provided.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // Valid for 5 minutes

  otpStore[email] = { otp, expiry, role };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tiffintales@gmail.com',
      pass: 'regf tlvj cxfi hpwg', // App password
    },
  });

  const mailOptions = {
    from: 'aroravartul@gmail.com',
    to: email,
    subject: 'OTP Verification Code',
    text: `Hello from Tiffin Tales!

Your One-Time Password (OTP) for secure access is: ${otp}

This code is valid for the next 5 minutes and is required to verify your identity. Please do not share this code with anyone, including Tiffin Tales staff, for your security.

If you did not request this code, please ignore this message or contact our support team immediately.

Thank you for choosing Tiffin Tales – where every meal tells a story! 🍱`

  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};

// Controller to verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp, role } = req.body;

  if (!email || !otp || !role) {
    return res.status(400).json({ message: 'Email, OTP, and role are required.' });
  }

  const record = otpStore[email];
  if (!record || record.role !== role) {
    return res.status(400).json({ message: 'OTP not found or role mismatch.' });
  }

  if (Date.now() > record.expiry) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
  }

  delete otpStore[email];

  const Model = getModelByRole(role);
  if (!Model) return res.status(400).json({ message: 'Invalid role provided.' });

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: `${role} not found.` });

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'OTP verified successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};
