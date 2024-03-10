// Authenticated user can view & update profile data

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../src/assets/images/profile-image-icon.png";

export const ProfileForm = () => {
  const [profileImage, setProfileImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    profileImage: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const user = useParams();

  const { firstName, lastName, username, email, password } = formData;

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            profileImage: userData.profileImage,
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

  const confirmPasswordsMatch = () => {
    if (!password || !confirmPassword) {
      toast.error(`Missing ${!password ? "password" : "confirm password"}`, {
        toastId: `password-${!password ? "missing" : "confirm-missing"}-fail`,
      });
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        toastId: "password-match-fail",
      });
      setConfirmPassword("");
      setFormData({ ...formData, password: "" });
      return false;
    }
    return true;
  };

  const fetchUpdateProfile = async () => {
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
        toast.success("Profile updated", {
          toastId: "profile-updated-success",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (confirmPasswordsMatch()) {
    await fetchUpdateProfile();
    // }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <div className="center-container">
      <div className="profile-form">
        <form action="" onSubmit={handleSubmit}>
          <img
            src={profileImage || `../src/assets/images/profile-image-icon.png`}
            width={100}
            height={100}
            alt=""
          />
          <label htmlFor="profile-picture">
            <input
              type="file"
              name="profile-picture"
              accept="image/png, image/jpeg, image/webp"
              onChange={convertToBase64}
            />
          </label>
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
