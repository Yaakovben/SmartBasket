import React, { useState } from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import Joi from "joi";
import LinksForm from "./links-auth-form/LinksAuthForm";
import TextInput from "../form-input/FormInput";
import type { FieldType, LinkType } from "../../types/auth-form.types";



type AuthFormProps = {
  title?: string;
  fields: FieldType[];
  loading?: boolean;
  validationSchema: Joi.ObjectSchema;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
  links?: LinkType[];
};

const AuthForm = ({
  title = "טופס",
  fields,
  loading = false,
  validationSchema,
  onSubmit,
  links,
}: AuthFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAll = (newValues: Record<string, string>) => {
    const { error } = validationSchema.validate(newValues, {
      abortEarly: false,
    });
    const newErrors: Record<string, string> = {};
    if (error) {
      for (const detail of error.details) {
        const fieldName = detail.path[0] as string;
        newErrors[fieldName] = detail.message;
      }
    }
    return newErrors;
  };

  const handleChange = (name: string, value: string) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    setErrors(validateAll(newValues));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateAll(values);
    if (Object.keys(newErrors).length > 0) return;
    await onSubmit(values);
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    fields.every((f) => values[f.name] && values[f.name].trim() !== "");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          width: { xs: "85%", sm: 360 },
          mx: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {title}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          {fields.map((field) => (
            <TextInput
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              showPass={showPass}
              toggleShowPass={() => setShowPass((s) => !s)}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isFormValid || loading}
          >
            {loading ? "טוען..." : "שלח"}
          </Button>
        </Box>

        {links && <LinksForm links={links} />}
      </Paper>
    </Box>
  );
};

export default AuthForm;
