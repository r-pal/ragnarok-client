import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Humours, humourOptions } from "types/shared";

interface HumourSelectProps {
  label: string;
  name: string;
  value: Humours | undefined;
  onChange: (event: SelectChangeEvent<Humours | undefined>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  fullWidth?: boolean;
}

export const HumourSelect: React.FC<HumourSelectProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  fullWidth = true
}) => {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {humourOptions.map((humour) => (
          <MenuItem key={humour} value={humour}>
            {humour.charAt(0).toUpperCase() + humour.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
