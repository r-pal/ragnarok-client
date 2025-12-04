import { Box, useTheme, alpha } from "@mui/material";
import { Humours } from "types/shared";
import { HUMOUR_CONFIG } from "config/humourConfig";
import { convertValue } from "helpers/scoreHelpers";
import { UnitType } from "../../App";
import { NumberWithFraction } from "./NumberWithFraction";

interface HumourScoreBoxProps {
  humour: Humours;
  value: number;
  isHighlighted?: boolean;
  unitType: UnitType;
  isMobile?: boolean;
}

export const HumourScoreBox: React.FC<HumourScoreBoxProps> = ({ 
  humour, 
  value, 
  isHighlighted = false,
  unitType,
  isMobile = false
}) => {
  const theme = useTheme();
  const config = HUMOUR_CONFIG[humour];
  const convertedValue = convertValue(value, unitType);
  
  // Create lighter background colors based on border colors
  const getBackgroundColor = () => {
    if (isHighlighted) {
      return alpha(theme.palette.primary.main, 0.3);
    }
    // Lighter versions of border colors for all views
    switch(humour) {
      case "phlegmatic": return alpha("#00ff00", 0.15); // green
      case "sanguine": return alpha("#dc143c", 0.15); // crimson
      case "choleric": return alpha("#ffd700", 0.15); // gold
      case "melancholic": return alpha("#808080", 0.15); // gray
      default: return "transparent";
    }
  };

  return (
    <Box
      sx={{
        border: isHighlighted ? 4 : 2,
        backgroundColor: getBackgroundColor(),
        fontWeight: isHighlighted ? "bold" : "normal",
        borderColor: config.borderColor,
        minWidth: isMobile ? 48 : 64,
        height: isMobile ? 48 : 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "4px" : "6px",
        fontSize: isMobile ? "1.25rem" : "1.5625rem"
      }}
    >
      <NumberWithFraction value={convertedValue} />
    </Box>
  );
};
