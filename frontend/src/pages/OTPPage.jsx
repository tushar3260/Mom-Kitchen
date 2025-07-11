import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [timer, setTimer] = useState(300);
  const email = localStorage.getItem('chefEmail');
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      toast.error('Please login first!');
      navigate('/chef/login');
    } else {
      autoSendOtp();
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email]);

  const autoSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/send-otp`, { email });
      toast.success(`OTP sent to ${email}`);
      setTimer(300);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (attemptsLeft <= 0) {
      toast.error('Maximum OTP attempts reached. Please try later.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/send-otp`, { email });
      toast.success(`OTP resent to ${email}`);
      setAttemptsLeft((prev) => prev - 1);
      setTimer(300);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      toast.error('Please enter the complete 6-digit OTP!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, { email, otp: enteredOtp });

      if (res.data.message.toLowerCase().includes('verify')) {
        toast.success('OTP verified! Redirecting...');
        setTimeout(() => {
          window.location.href = '/chef/chefdashboard';
        }, 1500);
      } else {
        toast.error(res.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#fff8ee] flex flex-col justify-center items-center p-5 font-sans relative">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-orange-500 mb-2">Chef OTP Verification</h1>

      <p className="text-sm text-gray-600 mb-4">
        {email ? `OTP has been sent to ${email}` : 'No email found. Please login again.'}
      </p>

      <p className="text-xs text-gray-500 mb-4">
        Attempts left: <span className="font-semibold">{attemptsLeft}</span> | Timer: <span className="font-semibold">{formatTime(timer)}</span>
      </p>

      <div className="flex gap-2 mb-6">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-12 h-12 text-center text-xl font-bold border border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-600 bg-white"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <button
        onClick={handleSendOtp}
        disabled={loading || timer > 0 || attemptsLeft <= 0}
        className={`mt-4 px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
          (loading || timer > 0 || attemptsLeft <= 0) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OTPPage;