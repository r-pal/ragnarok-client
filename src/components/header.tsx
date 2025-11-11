import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type SortBy = "balance" | "total" | "choleric" | "phlegmatic" | "melancholic" | "sanguine";

interface HeaderProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export const Header: React.FC<HeaderProps> = ({ sortBy, onSortChange }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel sx={{ color: "white" }}>Rank By</InputLabel>
        <Select
          value={sortBy}
          label="Rank By"
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white"
            },
            ".MuiSvgIcon-root": {
              color: "white"
            }
          }}
        >
          <MenuItem value="balance">Balance (σ)</MenuItem>
          <MenuItem value="total">Total Points</MenuItem>
          <MenuItem value="choleric">Choleric</MenuItem>
          <MenuItem value="phlegmatic">Phlegmatic</MenuItem>
          <MenuItem value="melancholic">Melancholic</MenuItem>
          <MenuItem value="sanguine">Sanguine</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export type { SortBy };
