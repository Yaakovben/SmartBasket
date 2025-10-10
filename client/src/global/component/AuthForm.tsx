import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Field = {
  name: string;
  label: string;
  type?: string; // text, password, email וכו'
};

type AuthFormProps = {
  title?: string;
  fields: Field[];
  loading?: boolean;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
};

const AuthForm = ({
  title = "טופס",
  fields,
  loading = false,
  onSubmit,
}: AuthFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // בדיקה אם אחד מהשדות ריק
    for (const field of fields) {
      if (!values[field.name]?.trim()) {
        setError("אנא מלא את כל השדות");
        return;
      }
    }

    await onSubmit(values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          width: { xs: "85%", sm: 360 },
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {title}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={
                field.type === "password" && !showPass ? "password" : "text"
              }
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              size="small"
              fullWidth
              InputProps={
                field.type === "password"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPass((s) => !s)}
                            edge="end"
                            size="small"
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
            />
          ))}

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            {loading ? "טוען..." : "שלח"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthForm;
