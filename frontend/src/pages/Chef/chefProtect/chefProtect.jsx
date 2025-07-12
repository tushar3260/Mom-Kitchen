import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChefContext from '../Context/chef.context.jsx';   // 👈 Tera ChefContext import

const ChefProtect = ({ children }) => {
  const { chef } = useContext(ChefContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChef = JSON.parse(localStorage.getItem('chef'));
    const role = chef?.role || storedChef?.role;

    const token = storedChef?.token;

    if (!token || role !== 'chef') {
      navigate('/chef/login');
    }
  }, [chef, navigate]);

  return children;
};

export default ChefProtect;
