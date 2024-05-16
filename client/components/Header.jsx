import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";

export const Header = () => {
  const [authUsername, setAuthUsername] = useState();

  const { authUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setAuthUsername(authUser.username);
    }
  }, [authUser]);

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
          <div onClick={() => navigate(`/profile/${authUser._id}`)}>
            Profile
          </div>
          {/* <div onClick={() => navigate(`/lobby/${userData._id}`)}>Lobby</div> */}
          <div onClick={() => navigate(`/chat/${authUser._id}`)}>Chat</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      ) : (
        <div onClick={() => navigate("/login")}>Login</div>
      )}
    </div>
  );
};
