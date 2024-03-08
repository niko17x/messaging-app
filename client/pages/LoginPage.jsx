import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm />
      <p>
        Not yet a member?
        <Link to="/register"> Register</Link>
      </p>
    </div>
  );
};
