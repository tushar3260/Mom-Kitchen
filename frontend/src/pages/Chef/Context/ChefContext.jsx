import { createContext, useState, useEffect, useContext } from 'react';

// 1️⃣ Create context
const ChefContext = createContext();

// 2️⃣ Custom hook to use context easily
export const useChef = () => {
  const context = useContext(ChefContext);
  if (!context) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};

// 3️⃣ Provider
export const ChefProvider = ({ children }) => {
  const [chef, setChef] = useState(null);
  const [chefToken, setChefToken] = useState(null);

  // 4️⃣ Auto-load chef data from localStorage
  useEffect(() => {
    const storedChef = localStorage.getItem('chefData');
    const storedToken = localStorage.getItem('chefToken');

    if (storedChef) setChef(JSON.parse(storedChef));
    if (storedToken) setChefToken(storedToken);
  }, []);

  return (
    <ChefContext.Provider value={{ chef, setChef, chefToken, setChefToken }}>
      {children}
    </ChefContext.Provider>
  );
};

export default ChefContext;
