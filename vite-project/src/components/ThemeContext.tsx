import { createContext, useState, useContext, ReactNode } from "react";


interface IThemeContext {
isDark: boolean;
toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined) 



//--------------------------------------- theme hook----------------------
export const useTheme = () => {
    const thcontext = useContext(ThemeContext)

    if (!thcontext) {
        throw new Error ("context error")
    }
    return thcontext;
}

interface ThemeProviderProps {
    children: ReactNode;
}

//-------------------------------------- hook wrapper-------------------------
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
  
    const toggleTheme = () => {
      setIsDark((prev) => !prev);
    };
  
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };