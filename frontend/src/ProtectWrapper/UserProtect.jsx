import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

const UserProtect = ({ children }) => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    const storedToken = localStorage.getItem('usertoken');

    const role = user?.role || storedUser?.role;

    if (!storedToken || role !== 'user') {
      navigate('/login');
    }
  }, [user, token, navigate]);

  return children;
};

export default UserProtect;
