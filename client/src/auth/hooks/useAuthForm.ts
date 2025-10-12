import { useState, useCallback } from "react";
import Joi from "joi";
import type { FieldType } from "../../global/types/auth-form.types";

export const useAuthForm = (
  fields: FieldType[],
  schema: Joi.ObjectSchema,
  onSubmit: (values: Record<string, string>) => Promise<void> | void
) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map(({ name }) => [name, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);

  /** ✅ ולידציה מלאה על כל הטופס */
  const validateAll = (data: Record<string, string>) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return {};
    return Object.fromEntries(
      error.details.map((d) => [d.path[0] as string, d.message])
    );
  };

  /** ✅ ולידציה לשדה בודד */
  const validateField = (name: string, value: string) => {
    try {
      const singleSchema = Joi.object({ [name]: schema.extract(name) });
      const { error } = singleSchema.validate({ [name]: value });
      return error?.details[0].message ?? "";
    } catch {
      return "";
    }
  };

  /** ✅ שינוי ערך + בדיקה באותו רגע */
  const handleChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const message = validateField(name, value);
      setErrors((prev) => {
        const updated = { ...prev };
        if (message) updated[name] = message;
        else delete updated[name];
        return updated;
      });
    },
    [schema]
  );

  /** ✅ שליחה עם ולידציה מלאה */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validateAll(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      await onSubmit(values);
    },
    [values, onSubmit, schema]
  );

  /** ✅ בדיקה אם הכל תקין */
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((v) => v.trim() !== "");

  const toggleShowPass = () => setShowPass((p) => !p);

  return {
    values,
    errors,
    showPass,
    handleChange,
    handleSubmit,
    isFormValid,
    toggleShowPass,
  };
};
