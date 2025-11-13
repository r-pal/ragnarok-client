/**
 * Load a font file and register it with the browser
 */
export async function loadFont(fontFamily: string, fileName: string): Promise<void> {
  try {
    // Strip quotes from fontFamily for FontFace constructor
    const cleanFontFamily = fontFamily.replace(/['"]/g, '');
    
    // URL encode the filename to handle spaces
    const encodedFileName = encodeURIComponent(fileName);
    
    console.log(`Loading font: ${cleanFontFamily} from ${fileName}`);
    
    const fontFace = new FontFace(
      cleanFontFamily,
      `url(/assets/fonts/${encodedFileName})`
    );
    
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
    console.log(`✓ Loaded font: ${cleanFontFamily}`);
  } catch (error) {
    console.error(`✗ Failed to load font: ${fontFamily}`, error);
    throw error;
  }
}

/**
 * Apply a font to the entire document
 */
export function applyFontToDocument(fontFamily: string): void {
  const fullFontFamily = `${fontFamily}, serif`;
  document.body.style.fontFamily = fullFontFamily;
  
  // Also update root element
  const root = document.getElementById('root');
  if (root) {
    root.style.fontFamily = fullFontFamily;
  }
}
