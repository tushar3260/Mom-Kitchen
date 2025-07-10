import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('usertoken') || null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('userData', JSON.stringify(user));
    else localStorage.removeItem('userData');

    if (token) localStorage.setItem('usertoken', token);
    else localStorage.removeItem('usertoken');
  }, [user, token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
