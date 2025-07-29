import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Admin from '../models/admin.js';
import User from '../models/User.js';
import Chef from '../models/Chef.js';
import Otp from '../models/otp.model.js'; // 👈 new import

// 🔧 Select model by role
const getModelByRole = (role) => {
  const models = {
    admin: Admin,
    user: User,
    chef: Chef,
  };
  return models[role] || null;
};

// ✅ Send OTP Controller (DB based)
export const sendOTP = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: 'Email and role are required.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min validity

  try {
    await Otp.findOneAndUpdate(
      { email },
      { email, otp, role, expiresAt, isVerified: false },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tiffintalesh@gmail.com',
        pass: 'regf tlvj cxfi hpwg', // ⚠️ Use env var in prod
      },
    });

    const mailOptions = {
      from: 'tiffintalesh@gmail.com',
      to: email,
      subject: 'OTP Verification Code',
      text: `Hello from Tiffin Tales!

Your One-Time Password (OTP) for secure access is: ${otp}

This code is valid for the next 5 minutes.

If you did not request this code, please ignore this message.

Thank you for choosing Tiffin Tales 🍱`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully.' });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// ✅ Verify OTP Controller (DB based)
export const verifyOTP = async (req, res) => {
  const { email, otp, role } = req.body;

  if (!email || !otp || !role) {
    return res.status(400).json({ message: 'Email, OTP, and role are required.' });
  }

  try {
    const record = await Otp.findOne({ email });

    if (!record || record.role !== role) {
      return res.status(400).json({ message: 'OTP not found or role mismatch.' });
    }

    if (record.isVerified) {
      return res.status(400).json({ message: 'OTP already verified.' });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
    }

    // ✅ Mark OTP verified
    record.isVerified = true;
    await record.save();

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
