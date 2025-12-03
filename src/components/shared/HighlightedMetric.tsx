import { useTheme, alpha } from "@mui/material";
import { ReactNode } from "react";

interface HighlightedMetricProps {
  label: string;
  value: string | number | ReactNode;
  isHighlighted: boolean;
}

export const HighlightedMetric: React.FC<HighlightedMetricProps> = ({ 
  label, 
  value, 
  isHighlighted 
}) => {
  const theme = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: isHighlighted ? alpha(theme.palette.primary.main, 0.3) : "transparent",
        padding: isHighlighted ? "4px 8px" : "0",
        borderRadius: "4px",
        fontWeight: isHighlighted ? "bold" : "normal"
      }}
    >
      <strong>{label}:</strong> {value}
    </div>
  );
};
