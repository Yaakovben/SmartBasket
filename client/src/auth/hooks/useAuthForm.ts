import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import type { FieldType } from "../types/auth-form.types";

export const useAuthForm = (
  fields: FieldType[],
  validationSchema: Joi.ObjectSchema,
  onSubmit: (values: Record<string, string>) => Promise<void> | void,
  redirectPath?: string
) => {
  const navigate = useNavigate();

  //  אתחול כל ערכי השדות
  const initializeValues = () =>
    Object.fromEntries(fields.map(({ name }) => [name, ""]));

  // איפוס הטופס
  const resetForm = useCallback(() => {
    setValues(initializeValues());
    setErrors({});
  }, [fields]);

  const [values, setValues] =
    useState<Record<string, string>>(initializeValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // בדיקה אם כל השדות תקינים
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((v) => v.trim() !== "");

  // הצגת/הסתרת סיסמה
  const toggleShowPassword = useCallback(() => setShowPassword((p) => !p), []);

  //  ולידציה מלאה על כל הטופס
  const validateAll = useCallback(
    (data: Record<string, string>) => {
      const { error } = validationSchema.validate(data, { abortEarly: false });
      if (!error) return {};
      return Object.fromEntries(
        error.details.map((d) => [d.path[0] as string, d.message])
      );
    },
    [validationSchema]
  );

  // ולידציה לשדה אחד בלבד
  const validateField = useCallback(
    (name: string, value: string) => {
      try {
        const singleSchema = Joi.object({
          [name]: validationSchema.extract(name),
        });
        const { error } = singleSchema.validate({ [name]: value });
        return error?.details[0].message ?? "";
      } catch {
        return "";
      }
    },
    [validationSchema]
  );

  // שינוי ערך שדה  וולידציה מיידית
  const handleChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      const message = validateField(name, value);
      setErrors((prev) => {
        const updated = { ...prev };
        if (message) updated[name] = message;
        else delete updated[name]; // אם אין שגיאה, מוחקים את המפתח
        return updated;
      });
    },
    [validateField]
  );

  // שליחת הטופס עם ולידציה
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateAll(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) return;

      await onSubmit(values);

      resetForm();

      if (redirectPath) {
        navigate(redirectPath);
      }
    },
    [values, onSubmit, validateAll, resetForm, redirectPath, navigate]
  );

  return {
    values,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    isFormValid,
    toggleShowPassword,
    resetForm,
  };
};
