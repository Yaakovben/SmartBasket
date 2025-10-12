import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type TextInputProps = {
  name: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
};

const TextInput = ({
  name,
  label,
  type,
  value,
  error,
  onChange,
  showPassword,
  toggleShowPassword,
}: TextInputProps) => (
  <TextField
    label={label}
    type={type === "password" && !showPassword ? "password" : "text"}
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    size="small"
    fullWidth
    error={!!error}
    helperText={error}
    InputProps={
      type === "password"
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} size="small">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }
        : undefined
    }
  />
);

export default TextInput;
