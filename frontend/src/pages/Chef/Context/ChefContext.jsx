import { createContext, useContext, useState, useEffect } from 'react';

// 👨‍🍳 1. Create context
const ChefContext = createContext();

// 🧠 2. Provider
export const ChefProvider = ({ children }) => {
  const [chef, setChef] = useState(null);
  const [chefToken, setChefToken] = useState(null);

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

// ✅ 3. Custom Hook
export const useChef = () => {
  const context = useContext(ChefContext);
  if (!context) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};

// 👇 Default export (optional)
export default ChefContext;
