import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export const Hero = () => {
  const navigate = useNavigate();

  const { authUser } = useContext(UserContext);

  return (
    <div className="center-container">
      <div className="hero">
        <h2>Thread Connect</h2>
        <p>
          Connect like never before with Thread Connect – your go-to direct
          messaging service where conversations feel personal and endless. Add
          friends, create message threads, and dive into a world where every
          chat brings you closer, no matter the distance. Experience seamless
          communication with Thread Connect, where every message bridges hearts
          and builds communities.
        </p>
        {/* {!userData ? (
          <div className="action-buttons">
            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button type="button" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/lobby/${userData._id}`)}
          >
            Lobby
          </button>
        )} */}
      </div>
    </div>
  );
};
