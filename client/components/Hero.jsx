import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const Hero = () => {
  const [user, setUser] = useState(false);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    userData ? setUser(true) : setUser(false);
  }, [userData]);

  const navigate = useNavigate();

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
        {user ? (
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
        )}
      </div>
    </div>
  );
};
