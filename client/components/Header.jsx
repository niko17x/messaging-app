import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [authUser, setAuthUser] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Logout successfull", {
          toastId: "logout-successful",
        });
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

      {authUser ? <div onClick={handleLogout}>Logout</div> : null}
    </div>
  );
};
