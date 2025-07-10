import React, { createContext, useContext, useState, useEffect } from 'react';

// 1️⃣ Create the context
const UserContext = createContext();

// 2️⃣ Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage when app loads
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 3️⃣ Keep localStorage in sync with context state
  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
// 4️⃣ Custom hook to use anywhere in the app
export const useUser = () => useContext(UserContext);
