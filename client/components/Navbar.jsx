import { toast } from "react-toastify";

export const Navbar = () => {
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
    <div>
      <h1>Header</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
