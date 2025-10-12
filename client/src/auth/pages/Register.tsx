import AuthForm from "../../global/component/auth-form/AuthForm";
import { registerService } from "../../services/authService";
import { registerSchema } from "../../validations/registerSchema";

type RegisterProps = {};

const Register = ({}: RegisterProps) => {
  return (
    <AuthForm
      fields={[
        { name: "username", label: "שם משתמש" },
        { name: "password", label: "סיסמה", type: "password" },
      ]}
      onSubmit={(values) => registerService(values.username, values.password)}
      title="הרשמה"
      validationSchema={registerSchema}
    />
  );
};

export default Register;
