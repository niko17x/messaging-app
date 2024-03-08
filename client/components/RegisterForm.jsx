import { useState } from "react";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, username, email, password } = formData;

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do match");
      return;
    }
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(`Registration successful: ${response.message}`);
        toast.success("Registration successful", {
          toastId: "succ-1",
        });
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        const data = await response.json();
        toast.error(data.errors[0].msg);
        // data.errors.forEach((error) => {
        //   toast.error(error.msg, { toastId: error.param });
        // });
      }
    } catch (err) {
      console.error(`Error registering user: ${err.message}`);
    }
  };

  return (
    <div className="center-container">
      <div className="register-form">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            <input
              type="text"
              name="firstName"
              autoFocus={true}
              placeholder="First Name"
              value={firstName}
              onChange={handleFormDataChange}
            />
          </label>
          <label htmlFor="lastName">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleFormDataChange}
            />
          </label>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleFormDataChange}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
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
          <label htmlFor="confirm-password">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
