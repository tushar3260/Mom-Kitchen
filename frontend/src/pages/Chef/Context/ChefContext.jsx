import { createContext, useState, useEffect } from 'react';

// 1️⃣ Create context
const ChefContext = createContext();

// 2️⃣ Provider
export const ChefProvider = ({ children }) => {
  const [chef, setChef] = useState(null);
  const [chefToken, setChefToken] = useState(null);

  // 3️⃣ Auto-load chef data from localStorage
  useEffect(() => {
    const storedChef = localStorage.getItem('chefData');
    const storedToken = localStorage.getItem('chefToken');

    if (storedChef) setChef(storedChef);
    if (storedToken) setChefToken(storedToken);
  }, []);

  return (
    <ChefContext.Provider value={{ chef, setChef, chefToken, setChefToken }}>
      {children}
    </ChefContext.Provider>
  );
};

export default ChefContext;
