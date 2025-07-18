import { useContext, useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { toast } from 'react-hot-toast';

const UserProtect = ({ children }) => {
  const { user, token } = useContext(UserContext);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const toastShownRef = useRef(false); // prevent double toast

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(res => setTimeout(res, 300)); // slight delay for loader
      const storedUser = JSON.parse(localStorage.getItem('userData'));
      const storedToken = localStorage.getItem('usertoken');

      const role = user?.role || storedUser?.role;

      if (!storedToken || role !== 'user') {
        if (!toastShownRef.current) {
          toast.error("🚫 Please login to access this page.");
          toastShownRef.current = true;
        }
        setRedirect(true);
      } else {
        setAuthenticated(true);
      }

      setChecking(false);
    };

    checkAuth();
  }, [user, token]);

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fff8ee] backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-8 rounded-xl shadow-2xl animate-fadeIn">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-dashed border-[#ff7e00] rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-solid border-white rounded-full"></div>
          </div>
          <p className="mt-4 text-[#ff7e00] font-semibold animate-pulse text-lg">
            Checking user credentials...
          </p>
        </div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtect;
