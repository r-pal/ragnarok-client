import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { loadTheme } from "./hooks/themeLoader";
import { loadFont, applyFontToDocument } from "./utils/fontLoader";
import { AVAILABLE_FONTS } from "./config/availableFonts";

interface ThemeContextType {
  switchTheme: (themeName: string) => Promise<void>;
  switchFont: (fontFamily: string, fileName: string) => Promise<void>;
  toggleFont: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  currentFont: string;
  currentTheme: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProviderWrapper");
  }
  return context;
};

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [currentFont, setCurrentFont] = useState(AVAILABLE_FONTS[0].fontFamily);
  const [currentTheme, setCurrentTheme] = useState("light");

  const switchTheme = async (themeName: string) => {
    const newTheme = await loadTheme(themeName, currentFont);
    setTheme(newTheme);
    setCurrentTheme(themeName);
  };

  const switchFont = async (fontFamily: string, fileName: string) => {
    try {
      console.log(`Switching to font: ${fontFamily} (${fileName})`);
      
      // Load the new font
      await loadFont(fontFamily, fileName);
      
      // Update state first
      setCurrentFont(fontFamily);
      
      // Apply it to the document
      applyFontToDocument(fontFamily);
      
      // Reload theme with new font
      const newTheme = await loadTheme("dark", fontFamily);
      setTheme(newTheme);
      
      console.log(`Font switched successfully to: ${fontFamily}`);
    } catch (error) {
      console.error("Failed to switch font:", error);
    }
  };

  const toggleFont = async () => {
    // Toggle between Medieval Sharp (index 0) and Free Medieval (index 1)
    const currentIndex = AVAILABLE_FONTS.findIndex(f => f.fontFamily === currentFont);
    const nextIndex = currentIndex === 0 ? 1 : 0;
    const nextFont = AVAILABLE_FONTS[nextIndex];
    
    await switchFont(nextFont.fontFamily, nextFont.fileName);
  };

  const toggleTheme = async () => {
    const newThemeName = currentTheme === "light" ? "dark" : "light";
    await switchTheme(newThemeName);
  };

  useEffect(() => {
    const initializeApp = async () => {
      // Load the default font first
      const defaultFont = AVAILABLE_FONTS[0];
      await loadFont(defaultFont.fontFamily, defaultFont.fileName);
      
      // Also load the bold variant for scoreboard
      await loadFont("'Medieval Sharp Bold'", "MedievalSharp-Bold.ttf");
      
      // Then load the theme with the font
      await switchTheme("light");
    };
    
    initializeApp();
  }, []);

  // Update background image when theme changes
  useEffect(() => {
    const backgroundImage = currentTheme === "dark" 
      ? "url(/assets/images/w05913-small.jpg)"
      : "url(/assets/images/Parchment-Background-HQ-Desktop-Wallpaper-14482.jpg)";
    
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }, [currentTheme]);

  // Update scrollbar styling when theme changes
  useEffect(() => {
    const styleId = 'custom-scrollbar-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const scrollbarStyles = currentTheme === "dark" 
      ? `
        /* Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(40, 30, 25, 0.5);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(161, 136, 127, 0.6);
          border-radius: 6px;
          border: 2px solid rgba(40, 30, 25, 0.5);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(161, 136, 127, 0.8);
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(161, 136, 127, 0.6) rgba(40, 30, 25, 0.5);
        }
      `
      : `
        /* Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(245, 230, 211, 0.3);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(93, 64, 55, 0.5);
          border-radius: 6px;
          border: 2px solid rgba(245, 230, 211, 0.3);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(93, 64, 55, 0.7);
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(93, 64, 55, 0.5) rgba(245, 230, 211, 0.3);
        }
      `;

    styleElement.textContent = scrollbarStyles;
  }, [currentTheme]);

  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ switchTheme, switchFont, toggleFont, toggleTheme, currentFont, currentTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
