import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const navigate = useNavigate();
  const location = useLocation();

  const inputsRef = useRef([]);

  // Optional: get email from query param or localstorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryEmail = params.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    } else {
      // fallback: try localStorage or prompt user
      const localEmail = window.localStorage.getItem('pendingEmail');
      if (localEmail) setEmail(localEmail);
    }
  }, [location]);

  // Timer logic
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  // Auto focus logic
  const focusInput = (idx) => {
    inputsRef.current[idx]?.focus();
  };

  // Send OTP handler
  const sendOtp = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/send-otp', { email });
      setOtpSent(true);
      setTimer(60);
      setAttemptsLeft((prev) => prev - 1);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not send OTP');
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Mount effect: auto send if email is present
  useEffect(() => {
    if (email) sendOtp();
  }, [email, sendOtp]);

  // OTP input handler
  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, ''); // digits only
    if (val.length > 1) return;
    setOtp((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
    if (val && idx < 5) focusInput(idx + 1);
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      focusInput(idx - 1);
    }
  };

  // Verify OTP handler
  const verifyOtp = async () => {
    if (otp.some((d) => d === '')) {
      setError('Please enter the complete OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/verify-otp', {
        email,
        otp: otp.join(''),
      });
      if (data?.isVerified) {
        setSuccess(true);
        setTimeout(() => navigate('/signup?email=' + encodeURIComponent(email)), 1500);
      } else {
        setError('Incorrect OTP');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (timer > 0 || attemptsLeft <= 0) return;
    sendOtp();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-orange-600">
          Email Verification
        </h2>
        <p className="mb-4 text-center text-gray-600">
          {email
            ? `We sent a 6-digit OTP to ${email}`
            : 'Please enter your email first'}
        </p>
        {error && (
          <p className="mb-3 text-center text-red-500">{error}</p>
        )}
        {success && (
          <p className="mb-3 text-center text-green-600">OTP Verified! Redirecting…</p>
        )}

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              pattern="\d*"
              maxLength={1}
              value={digit}
              disabled={loading || success}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              className="w-12 h-12 text-xl text-center border border-orange-400 rounded bg-white focus:outline-none"
            />
          ))}
        </div>

        <button
          className={`w-full py-2 rounded text-white font-bold ${
            loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={verifyOtp}
          disabled={loading || success}
        >
          {loading ? 'Verifying…' : 'Verify OTP'}
        </button>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-orange-500 underline text-sm ${
              (timer > 0 || attemptsLeft <= 0) && 'opacity-60 cursor-not-allowed'
            }`}
            disabled={timer > 0 || attemptsLeft <= 0}
            onClick={handleResend}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </button>
          <span className="text-xs text-gray-400 ml-2">
            Attempts left: {attemptsLeft}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
