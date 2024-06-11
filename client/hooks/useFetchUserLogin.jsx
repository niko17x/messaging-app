import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useFetchUserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const fetchUserLogin = async () => {
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

  return { formData, setFormData, fetchUserLogin };
};
