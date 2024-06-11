import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useFetchfetchLogoutUser = () => {
  const navigate = useNavigate();

  const fetchLogoutUser = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.removeItem("userInfo");
        toast.success("Logout successfull", {
          toastId: "logout-successful",
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchLogoutUser };
};
