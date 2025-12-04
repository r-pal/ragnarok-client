import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { UnitType } from "../../App";

interface UnitToggleProps {
  unitType: UnitType;
  onUnitTypeChange: (unitType: UnitType) => void;
  size?: "small" | "medium" | "large";
  color?: "standard" | "white";
}

export const UnitToggle: React.FC<UnitToggleProps> = ({
  unitType,
  onUnitTypeChange,
  size = "small",
  color = "standard"
}) => {
  const isWhite = color === "white";
  
  return (
    <ToggleButtonGroup
      value={unitType}
      exclusive
      onChange={(_, newUnit) => newUnit && onUnitTypeChange(newUnit)}
      size={size}
      sx={{ 
        height: 'fit-content',
        ...(isWhite && {
          '& .MuiToggleButton-root': {
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.5)'
            },
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
              }
            }
          }
        })
      }}
    >
      <ToggleButton value="fluidOunces" sx={{ fontSize: '0.65rem', px: 0.75, py: 0.25 }}>
        fl oz
      </ToggleButton>
      <ToggleButton value="pints" sx={{ fontSize: '0.65rem', px: 0.75, py: 0.25 }}>
        pints
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
