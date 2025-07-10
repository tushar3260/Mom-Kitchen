import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem('chefEmail');
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setMessage('Pehle login karo bhai!');
      window.location.href = "/chef/login";
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/send-otp`, { email });
      setMessage('OTP bhej diya gaya hai 📩');
    } catch (err) {
      setMessage(err.response?.data?.message || 'OTP bhejne me dikkat ho gayi 😵');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setMessage('Pura 6 digit OTP daal bhai!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, { email, otp: enteredOtp });

      if (res.data.message.toLowerCase().includes('verify')) {
        setMessage('OTP verify ho gaya! 🚀 Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(res.data.message || 'Galat OTP hai bhai 😡');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Server error 😓');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EE] flex flex-col justify-center items-center p-5 font-sans">
      <h1 className="text-4xl mb-4 font-bold text-orange-500">Chef OTP Verification</h1>

      <p className="text-sm text-orange-600 mb-4 font-semibold">
        {email ? `OTP has been sent to: ${email}` : 'No email found! Please login.'}
      </p>

      {message && (
        <p className="text-center text-orange-600 font-semibold mb-4">{message}</p>
      )}

      <button
        onClick={handleSendOtp}
        disabled={loading}
        className={`mb-6 px-8 py-2 rounded font-semibold transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>

      <div className="flex space-x-3 mb-6">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-12 h-12 text-center text-2xl font-mono rounded border border-orange-400 bg-white text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`px-8 py-2 rounded font-semibold transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
};

export default OTPPage;
