import { createTheme, ThemeOptions, Theme } from "@mui/material/styles";

/**
 * Load Medieval Sharp font (default font)
 */
async function loadDefaultFont(): Promise<void> {
  try {
    const fontFace = new FontFace(
      'Medieval Sharp',
      `url(${process.env.PUBLIC_URL}/assets/fonts/MedievalSharp-Book.ttf)`
    );
    
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
    console.log('✓ Loaded default font: Medieval Sharp');
  } catch (error) {
    console.error('✗ Failed to load default font:', error);
  }
}

/**
 * Fetch a theme JSON file from the public folder and create a MUI theme.
 */
export async function loadTheme(themeName: string, customFontFamily?: string): Promise<Theme> {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/assets/themes/${themeName}.json`);
    if (!res.ok) throw new Error(`Theme file not found: ${themeName}`);
    const themeData = (await res.json()) as ThemeOptions;
    
    // Load the default font if no custom font provided
    if (!customFontFamily) {
      await loadDefaultFont();
    }
    
    // Use custom font or default to Free Medieval
    const fontFamily = customFontFamily ? `${customFontFamily}, serif` : "'Free Medieval', serif";
    
    themeData.typography = {
      ...themeData.typography,
      fontFamily: fontFamily,
      // Override all typography variants
      h1: { fontFamily },
      h2: { fontFamily },
      h3: { fontFamily },
      h4: { fontFamily },
      h5: { fontFamily },
      h6: { fontFamily },
      subtitle1: { fontFamily },
      subtitle2: { fontFamily },
      body1: { fontFamily },
      body2: { fontFamily },
      button: { fontFamily },
      caption: { fontFamily },
      overline: { fontFamily }
    };
    
    // Override MUI component defaults
    themeData.components = {
      ...themeData.components,
      MuiCssBaseline: {
        styleOverrides: `
          * {
            font-family: ${fontFamily} !important;
          }
          body {
            font-family: ${fontFamily} !important;
            background-image: url(${process.env.PUBLIC_URL}/assets/images/Parchment-Background-HQ-Desktop-Wallpaper-14482.jpg);
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
          }
        `
      }
    };
    
    return createTheme(themeData);
  } catch (err) {
    console.error(`Failed to load theme: ${themeName}`, err);
    const fallbackRes = await fetch(`${process.env.PUBLIC_URL}/assets/themes/light.json`);
    const fallbackData = (await fallbackRes.json()) as ThemeOptions;
    return createTheme(fallbackData);
  }
}
