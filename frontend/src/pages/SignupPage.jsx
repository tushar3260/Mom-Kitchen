import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return '';
    if (pwd.length < 6) return 'Weak';
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^A-Za-z0-9]/)) return 'Strong';
    return 'Medium';
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("Please fill all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = { fullName: name, email, passwordHash: password, phone };

    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, userData);
      if (res.status === 201) {
        setSuccess("Signup successful! Redirecting...");
        setLoading(false);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-96 border border-yellow-300"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-yellow-500 text-center tracking-wide">
          Sign Up
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
          />
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(checkPasswordStrength(e.target.value));
              }}
              className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {password && (
            <p
              className={`text-sm mb-4 ${
                passwordStrength === 'Strong'
                  ? 'text-green-500'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}
          <div className="relative mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-6 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
          />

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-2xl text-lg shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : null}
            {loading ? 'Signing Up...' : 'Sign Up'}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-500 hover:underline font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default SignupPage;
