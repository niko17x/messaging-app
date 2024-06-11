import { toast } from "react-toastify";
import { useFetchUserLogin } from "../hooks/useFetchUserLogin";

export const LoginForm = () => {
  const { formData, setFormData, fetchUserLogin } = useFetchUserLogin();

  const { username, password } = formData;

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCredentials = () => {
    if (!username || !password) {
      toast.error("Please enter credentials", {
        toastId: "credentials-empty-error",
      });
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateCredentials();
    await fetchUserLogin();
  };

  return (
    <div className="center-container">
      <div className="login-form">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleFormDataChange}
              autoFocus={true}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleFormDataChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
