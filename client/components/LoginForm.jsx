import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUserLoginApi = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful", {
          toastId: "login-success",
        });
        setFormData({
          username: "",
          password: "",
        });
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        navigate("/");
      } else {
        const errorMessage = data.errors?.[0]?.msg || "Login failed";
        toast.error(errorMessage, {
          toastId: "credential-empty-error",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      toast.error("Please enter credentials", {
        toastId: "credentials-empty-error",
      });
      return;
    }

    fetchUserLoginApi();
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
