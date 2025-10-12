import { useNavigate } from "react-router-dom";
import AuthForm from "../../global/component/auth-form/AuthForm";
import { registerService } from "../../services/authService";
import { registerSchema } from "../../validations/registerSchema";
import {
  getRegisterLinks,
  registerFields,
} from "../helpers/register/register.props";

const Register = () => {
  const navigate = useNavigate();

  const registerLinks = getRegisterLinks(navigate);
  return (
    <AuthForm
      fields={registerFields}
      onSubmit={(values) => registerService(values.username, values.password)}
      title="הרשמה"
      validationSchema={registerSchema}
      links={registerLinks}
    />
  );
};

export default Register;
