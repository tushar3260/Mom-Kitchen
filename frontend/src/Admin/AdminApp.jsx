import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './Adminlogin.jsx';
import AdminSignup from './AdminSignup.jsx';
import AdminDashboard from  './AdminDashboard.jsx';
import AdminAllUsers from './admincomponents/AdminAllusers.jsx';
import AdminAllChefs from './admincomponents/adminAllchef.jsx';
import AdminAllOrders from './admincomponents/AdminAllorder.jsx';



function AdminApp() {
  return (
    <div>
      
       
          <Routes>
          
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/" element={<AdminSignup />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<AdminAllUsers />} />
            <Route path="/chefs" element={<AdminAllChefs/>} />
            <Route path="/orders" element={<AdminAllOrders/>} />
           
            
            {/* <Route path="/dashboard" element={<DashBoard />} /> */}
          </Routes>
     
     
    </div>
  );
}

export default AdminApp;
