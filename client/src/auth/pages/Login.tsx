import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";
import { loginSchema } from "../helpers/validations/loginSchema";
import { getLoginLinks, loginFields } from "../helpers/login/login.props";
import AuthForm from "../component/auth-form/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  const loginLinks = getLoginLinks(navigate);

  return (
    <AuthForm
      title="כניסה"
      fields={loginFields}
      onSubmit={(values) => loginService(values.username, values.password)}
      validationSchema={loginSchema}
      links={loginLinks}
      redirectPath="/home"
    />
  );
};

export default Login;
