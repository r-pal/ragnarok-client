import { Button, Dialog, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Explainer } from "./explainer";

type SortBy = "balance" | "total" | "choleric" | "phlegmatic" | "melancholic" | "sanguine" | "hot" | "cold" | "moist" | "dry";

interface HeaderProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export const Header: React.FC<HeaderProps> = ({ sortBy, onSortChange }) => {
  const [openExplainer, setOpenExplainer] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px"
        }}
      >
        <Button
          onClick={() => setOpenExplainer(true)}
          sx={{ color: "white", minWidth: "100px" }}
        >
          Sacred Rules
        </Button>
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
          <MenuItem value="balance">Balance ⚖️</MenuItem>
          <MenuItem value="total">Fluid Weight 🥂</MenuItem>
          <MenuItem value="choleric">Choleric 🟡</MenuItem>
          <MenuItem value="phlegmatic">Phlegmatic 🟢</MenuItem>
          <MenuItem value="melancholic">Melancholic ⚫</MenuItem>
          <MenuItem value="sanguine">Sanguine 🔴</MenuItem>
        </Select>
      </FormControl>
      <div style={{ minWidth: "100px" }}></div>
    </div>

    <Dialog
      open={openExplainer}
      onClose={() => setOpenExplainer(false)}
      maxWidth="md"
      fullWidth
    >
      <Explainer />
    </Dialog>
    </>
  );
};

export type { SortBy };
