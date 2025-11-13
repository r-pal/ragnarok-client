import { Box, useTheme, alpha } from "@mui/material";
import { Humours } from "types/shared";
import { HUMOUR_CONFIG } from "config/humourConfig";
import { formatScoreDisplay } from "helpers/scoreHelpers";

interface HumourScoreBoxProps {
  humour: Humours;
  value: number;
  isHighlighted?: boolean;
}

export const HumourScoreBox: React.FC<HumourScoreBoxProps> = ({ 
  humour, 
  value, 
  isHighlighted = false 
}) => {
  const theme = useTheme();
  const config = HUMOUR_CONFIG[humour];
  const { display, fontSize } = formatScoreDisplay(value);

  return (
    <Box
      sx={{
        border: isHighlighted ? 3 : 1,
        backgroundColor: isHighlighted ? alpha(theme.palette.primary.main, 0.3) : "transparent",
        fontWeight: isHighlighted ? "bold" : "normal",
        borderColor: config.borderColor,
        minWidth: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px",
        fontSize
      }}
    >
      {display}
    </Box>
  );
};
