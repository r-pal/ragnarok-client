import { SxProps, Theme } from "@mui/material";

export const getExplainerStyles = (isMobile: boolean) => ({
  // Container styles
  container: {
    maxWidth: 900,
    mx: "auto",
    p: isMobile ? 2 : 4,
    overflowY: "auto"
  } as SxProps<Theme>,

  // Typography styles
  mainTitle: {
    mb: isMobile ? 1 : 2,
    textAlign: "center"
  } as SxProps<Theme>,

  subtitle: {
    mb: isMobile ? 2 : 4,
    textAlign: "center",
    fontStyle: "italic",
    color: "text.secondary"
  } as SxProps<Theme>,

  // Paper styles
  paper: {
    p: isMobile ? 2 : 3,
    mb: isMobile ? 2 : 3
  } as SxProps<Theme>,

  divider: {
    mb: 2
  } as SxProps<Theme>,

  // Section heading styles
  sectionHeading: {
    mt: 2,
    fontWeight: "bold"
  } as SxProps<Theme>,

  sectionHeadingWithMargin: {
    mt: isMobile ? 2 : 3,
    fontWeight: "bold"
  } as SxProps<Theme>,

  sectionHeadingBold: {
    mt: isMobile ? 2 : 3,
    fontWeight: "bold"
  } as SxProps<Theme>,

  sectionHeadingBoldLarge: {
    mt: isMobile ? 2 : 3,
    fontWeight: "bold"
  } as SxProps<Theme>,

  pathsHeadingBoldPrimary: {
    mt: isMobile ? 2 : 3,
    fontWeight: "bold",
    color: "primary.main"
  } as SxProps<Theme>,

  twinPathsListSpecial: {
    py: isMobile ? 0 : 1,
    bgcolor: "rgba(255,215,0,0.05)",
    borderRadius: 1,
    border: "2px solid rgba(255,215,0,0.3)",
    fontWeight: "bold"
  } as SxProps<Theme>,

  // Paragraph styles
  paragraph: {
    fontSize: isMobile ? "0.875rem" : "1rem"
  } as SxProps<Theme>,

  paragraphItalic: {
    fontSize: isMobile ? "0.875rem" : "1rem",
    fontStyle: "italic",
    mb: 2
  } as SxProps<Theme>,

  paragraphWithMargin: {
    fontSize: isMobile ? "0.875rem" : "1rem",
    mb: 2
  } as SxProps<Theme>,

  // Four Humours container
  humoursContainer: {
    display: "flex",
    gap: isMobile ? 1 : 2,
    justifyContent: "center",
    flexWrap: "wrap",
    mb: 2
  } as SxProps<Theme>,

  // Individual humour card
  humourCard: {
    flex: isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto",
    minWidth: isMobile ? 0 : "auto",
    textAlign: "center",
    p: isMobile ? 1 : 2,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 1
  } as SxProps<Theme>,

  // Complete humour cards with backgrounds
  cholericCardComplete: {
    flex: isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto",
    minWidth: isMobile ? 0 : "auto",
    textAlign: "center",
    p: isMobile ? 1 : 2,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 1,
    bgcolor: "rgba(255,215,0,0.05)"
  } as SxProps<Theme>,

  phlegmaticCardComplete: {
    flex: isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto",
    minWidth: isMobile ? 0 : "auto",
    textAlign: "center",
    p: isMobile ? 1 : 2,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 1,
    bgcolor: "rgba(0,255,0,0.03)"
  } as SxProps<Theme>,

  melancholicCardComplete: {
    flex: isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto",
    minWidth: isMobile ? 0 : "auto",
    textAlign: "center",
    p: isMobile ? 1 : 2,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 1,
    bgcolor: "rgba(0,0,0,0.03)"
  } as SxProps<Theme>,

  sanguineCardComplete: {
    flex: isMobile ? "1 1 calc(50% - 8px)" : "0 1 auto",
    minWidth: isMobile ? 0 : "auto",
    textAlign: "center",
    p: isMobile ? 1 : 2,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 1,
    bgcolor: "rgba(255,0,0,0.03)"
  } as SxProps<Theme>,

  // Humour card typography
  humourCaption: {
    fontSize: isMobile ? "0.65rem" : "0.875rem"
  } as SxProps<Theme>,

  humourCaptionBlock: {
    mt: isMobile ? 0.5 : 1,
    fontSize: isMobile ? "0.6rem" : "0.75rem"
  } as SxProps<Theme>,

  // Table styles
  tableContainer: {
    mb: 2
  } as SxProps<Theme>,

  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  tableHeaderRow: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  } as SxProps<Theme>,

  tableBody: {
    fontSize: isMobile ? "0.7rem" : "0.875rem"
  } as SxProps<Theme>,

  tableCellBold: {
    fontWeight: "bold"
  } as SxProps<Theme>,

  // Table row backgrounds
  melancholicRow: {
    backgroundColor: "rgba(0,0,0,0.03)"
  } as SxProps<Theme>,

  sanguineRow: {
    backgroundColor: "rgba(250, 155, 155,0.1)"
  } as SxProps<Theme>,

  cholericRow: {
    backgroundColor: "rgba(255,215,0,0.1)"
  } as SxProps<Theme>,

  phlegmaticRow: {
    backgroundColor: "rgba(0,255,0,0.05)"
  } as SxProps<Theme>,

  // Gameshow box
  gameshowBox: {
    border: "2px solid rgba(128, 0, 128, 0.5)",
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)",
    borderRight: "3px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "rgba(128, 0, 128, 0.1)",
    textAlign: "center",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  gameshowWrapperCell: {
    padding: 0
  } as SxProps<Theme>,

  // Box with padding
  paddedBox: {
    pl: isMobile ? 1 : 2,
    mb: 2
  } as SxProps<Theme>,

  // Example boxes
  exampleBox: {
    fontStyle: "italic",
    bgcolor: "rgba(0,0,0,0.05)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  exampleBoxWithMargin: {
    fontStyle: "italic",
    bgcolor: "rgba(0,0,0,0.05)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mt: 2,
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Paths to Glory styles
  pathsHeading: {
    mt: isMobile ? 1.5 : 2,
    fontWeight: "bold"
  } as SxProps<Theme>,

  pathsHeadingPrimary: {
    mt: isMobile ? 2 : 3,
    fontWeight: "bold",
    color: "primary.main"
  } as SxProps<Theme>,

  pathsHeadingText: {
    mt: isMobile ? 1.5 : 2,
    fontWeight: "bold",
    fontSize: isMobile ? "0.875rem" : "1rem"
  } as SxProps<Theme>,

  twinPathsList: {
    py: isMobile ? 0 : 1,
    bgcolor: "rgba(255,215,0,0.05)",
    borderRadius: 1,
    border: "2px solid rgba(255,215,0,0.3)",
    fontWeight: "bold"
  } as SxProps<Theme>,

  ascensionBox: {
    bgcolor: "rgba(255,215,0,0.1)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mt: 2,
    border: "2px solid rgba(255,215,0,0.5)",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // List styles
  list: {
    py: isMobile ? 0 : 1
  } as SxProps<Theme>,

  listItem: {
    py: isMobile ? 0.5 : 1,
    px: isMobile ? 1 : 2
  } as SxProps<Theme>,

  // Typography props for list items
  listItemPrimaryProps: {
    fontSize: isMobile ? "0.875rem" : "1rem",
    fontWeight: "bold"
  },

  listItemSecondaryProps: {
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  },

  // Warning box
  warningBox: {
    fontStyle: "italic",
    bgcolor: "rgba(255,0,0,0.05)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    border: "1px solid rgba(255,0,0,0.2)",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Divine clemency example box
  clemencyExampleBox: {
    fontStyle: "italic",
    bgcolor: "rgba(0,0,0,0.05)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mb: 2,
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Purple miracle box
  miracleBox: {
    fontStyle: "italic",
    bgcolor: "rgba(138,43,226,0.05)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mb: 2,
    border: "1px solid rgba(138,43,226,0.2)",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Grid for image + list
  imageListGrid: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 3fr",
    gap: isMobile ? 1 : 0
  } as SxProps<Theme>,

  // Final warning box (yellow)
  finalWarningBox: {
    fontStyle: "italic",
    bgcolor: "rgba(255,215,0,0.1)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mt: 2,
    border: "1px solid rgba(255,215,0,0.3)",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Special styles
  paragraphItalicWithMargin: {
    fontSize: isMobile ? "0.875rem" : "1rem",
    fontStyle: "italic",
    mb: 2
  } as SxProps<Theme>,

  pathsHeadingBold: {
    mt: isMobile ? 1.5 : 2,
    fontWeight: "bold"
  } as SxProps<Theme>,

  ascensionBoxAlt: {
    bgcolor: "rgba(255,215,0,0.1)",
    p: isMobile ? 1.5 : 2,
    borderRadius: 1,
    mt: 2,
    border: "2px solid rgba(255,215,0,0.5)",
    fontSize: isMobile ? "0.75rem" : "0.875rem"
  } as SxProps<Theme>,

  // Gameshow border styles
  gameshowHeaderCellWithBorders: {
    fontWeight: "bold",
    backgroundColor: "rgba(128, 0, 128, 0.1)",
    textAlign: "center",
    fontSize: isMobile ? "0.75rem" : "0.875rem",
    borderTop: "2px solid rgba(128, 0, 128, 0.5)",
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)",
    borderRight: "3px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowCellLeft: {
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowCellRight: {
    borderRight: "3px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowCellLeftBottom: {
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)",
    borderBottom: "2px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowCellBottom: {
    borderBottom: "2px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  gameshowCellRightBottom: {
    borderRight: "3px solid rgba(128, 0, 128, 0.5)",
    borderBottom: "2px solid rgba(128, 0, 128, 0.5)"
  } as SxProps<Theme>,

  // Combined gameshow styles with bold
  gameshowCellLeftBold: {
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)",
    fontWeight: "bold"
  } as SxProps<Theme>,

  gameshowCellLeftBottomBold: {
    borderLeft: "3px solid rgba(128, 0, 128, 0.5)",
    borderBottom: "2px solid rgba(128, 0, 128, 0.5)",
    fontWeight: "bold"
  } as SxProps<Theme>
});
