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
  currentFont: string;
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

  const switchTheme = async (themeName: string) => {
    const newTheme = await loadTheme(themeName, currentFont);
    setTheme(newTheme);
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

  useEffect(() => {
    const initializeApp = async () => {
      // Load the default font first
      const defaultFont = AVAILABLE_FONTS[0];
      await loadFont(defaultFont.fontFamily, defaultFont.fileName);
      
      // Also load the bold variant for scoreboard
      await loadFont("'Medieval Sharp Bold'", "MedievalSharp-Bold.ttf");
      
      // Then load the theme with the font
      await switchTheme("light");
      
      // Add parchment background to body
      document.body.style.backgroundImage = "url(/assets/images/Parchment-Background-HQ-Desktop-Wallpaper-14482.jpg)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    };
    
    initializeApp();
  }, []);

  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ switchTheme, switchFont, toggleFont, currentFont }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
