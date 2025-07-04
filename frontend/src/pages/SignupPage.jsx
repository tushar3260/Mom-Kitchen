import React, { useState } from 'react';


function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log('Signing up:', name, email, password);
    // Add your signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 border">
        <h2 className="text-3xl font-bold mb-6 text-yellow-500 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSignup}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl text-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};


export default SignupPage;