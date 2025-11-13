export interface FontOption {
  name: string;
  fontFamily: string;
  fileName: string;
}

export const AVAILABLE_FONTS: FontOption[] = [
  {
    name: "Medieval Sharp",
    fontFamily: "'Medieval Sharp'",
    fileName: "MedievalSharp-Book.ttf"
  },
  {
    name: "Free Medieval",
    fontFamily: "'Free Medieval'",
    fileName: "Free Medieval.ttf"
  }
];
