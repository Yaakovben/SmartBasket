import AuthForm from "../global/component/AuthForm";
import { loginService } from "../services/authService";

type LoginProps = {};

const Login = ({}: LoginProps) => {
  return (
    <AuthForm
      title="כניסה"
      fields={[
        { name: "username", label: "שם משתמש" },
        { name: "password", label: "סיסמה", type: "password" },
      ]}
      onSubmit={(values) => loginService(values.username, values.password)}
    />
  );
};

export default Login;
