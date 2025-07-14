import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../context/AdminContext'; // Assuming admin info is also stored here

const AdminProtect = ({ children }) => {
  const { admin,adminToken } = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('AdminData'));
    const storedAdminToken = localStorage.getItem('AdminToken');

    const role = admin?.role || storedAdmin?.role;

    if (!storedAdminToken || role !== 'admin') {
      navigate('/admin/secure/tales/login');  // Redirect to login if not admin
    }
  }, [admin, adminToken, navigate]);

  return children;
};

export default AdminProtect;