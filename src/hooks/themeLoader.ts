import { createTheme, ThemeOptions, Theme } from "@mui/material/styles";

/**
 * Fetch a theme JSON file from the public folder and create a MUI theme.
 */
export async function loadTheme(themeName: string): Promise<Theme> {
  try {
    const res = await fetch(`/assets/themes/${themeName}.json`);
    if (!res.ok) throw new Error(`Theme file not found: ${themeName}`);
    const themeData = (await res.json()) as ThemeOptions;
    return createTheme(themeData);
  } catch (err) {
    console.error(`Failed to load theme: ${themeName}`, err);
    const fallbackRes = await fetch("/assets/themes/light.json");
    const fallbackData = (await fallbackRes.json()) as ThemeOptions;
    return createTheme(fallbackData);
  }
}
