import nodemailer from 'nodemailer';

// In-memory store for OTPs (demo ke liye, production me DB use karna)
const otpStore = {};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email dena zaroori hai!' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 min ke liye valid

  otpStore[email] = { otp, expiry };

  // Nodemailer transporter setup (Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aroravartul@gmail.com',     // apna Gmail daal yahan
      pass: 'hrwx pcfz xmvg ulna',                // Gmail ka app password yahan daal
    },
  });

  const mailOptions = {
    from: 'aroravartul@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Tera OTP hai: ${otp}. Yeh 5 minute ke liye valid hai.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP bhej diya bhai!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'OTP bhejne me dikkat aa rahi hai.' });
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email aur OTP dono chahiye!' });

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: 'OTP bhejna pehle padega!' });

  if (Date.now() > record.expiry) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP expire ho gaya bhai!' });
  }

  if (record.otp !== otp) return res.status(400).json({ message: 'OTP galat hai!' });

  delete otpStore[email]; // success pe OTP hata do
  res.status(200).json({ message: 'OTP verify ho gaya bhai!' });
};
