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
  disabled?: boolean;
}

export const HumourSelect: React.FC<HumourSelectProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  fullWidth = true,
  disabled = false
}) => {
  return (
    <FormControl fullWidth={fullWidth} required={required} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        disabled={disabled}
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
