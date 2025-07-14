import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const token = window.location.pathname.split("/").pop(); // get token from URL
  const role = new URLSearchParams(search).get("role");

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/forgot/reset-password`, {
        token,
        role,
        newPassword,
      });

      setMessage(res.data.message || 'Password reset successful!');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Reset failed. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-orange-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
          {message && <p className="text-green-500 mb-3 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
