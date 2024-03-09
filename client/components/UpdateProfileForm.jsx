// Authenticated user can view & update profile data

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const UpdateProfileForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const user = useParams();

  const { firstName, lastName, username, email, password } = formData;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/profile/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = await data.userData;
          setFormData({
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            password: "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    console.log(password === undefined);
  });

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const confirmPasswordsMatch = () => {
    if (password) {
      console.log(password, confirmPassword);
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          toastId: "password-match-fail",
        });
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    confirmPasswordsMatch();

    try {
      const response = await fetch(`/api/user/profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password || "",
        });
        setConfirmPassword("");
      }
      toast.success("Profile updated", {
        toastId: "profile-updated-success",
      });
    } catch (err) {
      console.error(err);
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
