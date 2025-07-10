import React from 'react';
import ChefSignup from './ChefSignup';
import ChefLogin from './ChefLogin';
import ChefDashboard from './ChefDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OTPPage from '../OTPPage'; // Assuming OTPPage is used in the flow
const ChefApp = () => {
  return (
  
      <Routes>
        
        <Route path="/" element={<ChefSignup />} />
        <Route path="/login" element={<ChefLogin />} />
        <Route path="/chefdashboard" element={<ChefDashboard />} />
        <Route path="/otp" element={<OTPPage />} />
        {/* Optional: Add dashboard or 404 page later */}
      </Routes>
    
  );
};

export default ChefApp;

     