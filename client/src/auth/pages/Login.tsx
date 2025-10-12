import { useNavigate } from "react-router-dom";
import AuthForm from "../../global/component/auth-form/AuthForm";
import { loginService } from "../../services/authService";
import { loginSchema } from "../helpers/validations/loginSchema";
import { getLoginLinks, loginFields } from "../helpers/login/login.props";

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
