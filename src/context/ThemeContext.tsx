import React, { useState, createContext } from 'react';

export interface ThemeContextProps {
   theme: string,
   toggleDarkMode: (theme: any) => void
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider: React.FC = ({ children }) => {
   const [theme, setTheme] = useState('light');

   const toggleDarkMode = (theme: any) => {
      setTheme(theme);
   }

   return (
      <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
         {children}
      </ThemeContext.Provider>
   );
}