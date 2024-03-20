import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const Header = () => {
  const [authUsername, setAuthUsername] = useState();

  const { userData } = useFetchAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setAuthUsername(userData.username);
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setAuthUsername("");
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

  return (
    <div className="header">
      <Link to="/">
        <img
          src="../src/assets/images/logo.webp"
          alt=""
          className="main-logo"
        />
      </Link>

      {authUsername ? (
        <div>
          <div onClick={() => navigate(`/profile/${userData._id}`)}>
            Profile
          </div>
          <div onClick={() => navigate(`/lobby/${userData._id}`)}>Lobby</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      ) : (
        <div onClick={() => navigate("/login")}>Login</div>
      )}
    </div>
  );
};
