import React, { useState } from 'react';
// import axios from 'axios';
 function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96 border">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">Login</h2>
       <form 
       >
         <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
        
          className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-lg"
        >
          Login
        </button>
       </form>
      </div>
    </div>
  );
};


export default LoginPage;