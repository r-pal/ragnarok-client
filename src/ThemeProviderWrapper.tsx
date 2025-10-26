import {  createContext,  useState,  useEffect,  ReactNode} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { loadTheme } from './hooks/themeLoader';

interface ThemeContextType {
  switchTheme: (themeName: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [theme, setTheme] = useState<Theme | null>(null);

  const switchTheme = async (themeName: string) => {
    const newTheme = await loadTheme(themeName);
    setTheme(newTheme);
  };

  useEffect(() => {
    switchTheme('dark');
  }, []);

  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ switchTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
