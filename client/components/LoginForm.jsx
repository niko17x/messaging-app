import { useState } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
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
