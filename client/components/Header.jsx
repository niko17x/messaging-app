import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { useFetchfetchLogoutUser } from "../hooks/useFetchLogoutUser";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const { authUser } = useContext(UserContext);
  const { userData } = useFetchAuthUser();

  const navigate = useNavigate();

  const { fetchLogoutUser } = useFetchfetchLogoutUser();

  const handleLogout = async () => {
    await fetchLogoutUser();
    if (authUser !== null) setIsLoggedIn(false);
  };

  useEffect(() => {
    if (userData && userData._id) {
      setIsLoggedIn(true);
    }
  }, [userData]);

  // console.log("first");

  return (
    <div className="header">
      <Link to="/">
        <img
          src="../src/assets/images/logo.webp"
          alt=""
          className="main-logo"
        />
      </Link>

      {isLoggedIn ? (
        <div>
          <div onClick={() => navigate(`/profile/${userData._id}`)}>
            Profile
          </div>
          {/* <div onClick={() => navigate(`/lobby/${userData._id}`)}>Lobby</div> */}
          <div onClick={() => navigate(`/chat/${userData._id}`)}>Chat</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      ) : (
        <div>
          <div onClick={() => navigate("/login")}>Login</div>
        </div>
      )}
    </div>
  );
};
