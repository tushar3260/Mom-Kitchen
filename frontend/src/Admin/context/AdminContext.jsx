import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('adminData');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse adminData:", error);
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('adminToken') || null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('adminData', JSON.stringify(admin));
    } else {
      localStorage.removeItem('adminData');
    }

    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [admin, adminToken]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, adminToken, setAdminToken }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for accessing admin context
export const useAdmin = () => useContext(AdminContext);

export default AdminContext;
