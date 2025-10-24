import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';

/**
 * Dynamically loads a theme JSON file and returns a MUI Theme object.
 */
export async function loadTheme(themeName: string): Promise<Theme> {
  try {
    // Dynamic import of JSON theme file
    const themeData: { default: ThemeOptions } = await import(`../public/assets/themes/${themeName}.json`);
    return createTheme(themeData.default);
  } catch (err) {
    console.error(`Failed to load theme: ${themeName}`, err);
    const fallback: { default: ThemeOptions } = await import('../../public/assets/themes/light.json');
    return createTheme(fallback.default);
  }
}
