import AuthForm from "../global/component/AuthForm";
import { registerService } from "../services/authService";

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
    />
  );
};

export default Register;
