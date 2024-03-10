import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const { profileImage, firstName, lastName, username, email, password } =
    formData;
  const navigate = useNavigate();

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

      console.log(formData);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        console.log(`Registration successful: ${data.message}`);
        toast.success("Registration successful", {
          toastId: "registration-successful",
        });
        setFormData({
          profileImage: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        navigate("/");
      } else {
        const data = await response.json();
        toast.error(data.errors && data.errors[0].msg);
      }
    } catch (err) {
      console.error(`Error registering user: ${err.message}`);
    }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData({
        ...formData,
        profileImage: reader.result,
      });
      console.log(profileImage);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  // TODO: WORKING ON ALLOWING USER TO SELECT PHOTO AND ADD TO PROFILE. CURRENTLY ONLY ABLE TO SELECT VERY SMALL IMAGE FILES. FILES ARE SUCCESSFULLY SENT TO SERVER AND STORED IN MONGODB. IMG FILES ARE NOT ABLE TO BE RETRIEVED FROM MONGODB TO SHOW ON UPDATE PROFILE PAGE.

  return (
    <div className="center-container">
      <div className="register-form">
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
              accept="*"
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
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
