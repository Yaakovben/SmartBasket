import { Box, Paper, Button, Typography } from "@mui/material";
import LinksForm from "./links-auth-form/LinksAuthForm";
import TextInput from "../form-input/FormInput";
import type { FieldType, LinkType } from "../../types/auth-form.types";
import Joi from "joi";
import { useAuthForm } from "../../../auth/hooks/useAuthForm";

type AuthFormProps = {
  title?: string;
  fields: FieldType[];
  loading?: boolean;
  validationSchema: Joi.ObjectSchema;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
  links?: LinkType[];
  redirectPath?: string;
};

const AuthForm = ({
  title = "טופס",
  fields,
  loading = false,
  validationSchema,
  onSubmit,
  links,
  redirectPath,
}: AuthFormProps) => {
  const {
    values,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    isFormValid,
    toggleShowPassword,
  } = useAuthForm(fields, validationSchema, onSubmit, redirectPath);
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      bgcolor: "#f5f5f5",
    },
    paper: {
      p: { xs: 3, sm: 4 },
      borderRadius: 2,
      width: { xs: "80%", sm: 360 },
      mx: "auto",
    },
    form: { display: "grid", gap: 2 },
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper elevation={3} sx={styles.paper}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
          {fields.map((field) => (
            <TextInput
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
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
