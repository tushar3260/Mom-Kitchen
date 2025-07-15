import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin.jsx';
import AdminSignup from './AdminSignup.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminAllUsers from './admincomponents/AdminAllusers.jsx'
import AdminAllChefs from './admincomponents/AdminAllchef.jsx';
import AdminAllOrders from './admincomponents/AdminAllorder.jsx';
// import AdminAllOrders from './admincomponents/admincomponents/AdminAllOrders.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import AdminProtect from './protect/adminprotect.jsx';

function AdminApp() {
  return (
    
      <AdminProvider>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminSignup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AdminProtect>
                <AdminDashboard />
              </AdminProtect>
            }
          />
          <Route
            path="/users"
            element={
              <AdminProtect>
                <AdminAllUsers />
              </AdminProtect>
            }
          />
          <Route
            path="/chefs"
            element={
              <AdminProtect>
                <AdminAllChefs />
              </AdminProtect>
            }
          />
          <Route
            path="/orders"
            element={
              <AdminProtect>
                <AdminAllOrders />
              </AdminProtect>
            }
          />
        </Routes>
      </AdminProvider>
   
  );
}

export default AdminApp;
