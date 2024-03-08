import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="register-page">
      <h1>Registration</h1>
      <RegisterForm />
      <p>
        Already a have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
};
