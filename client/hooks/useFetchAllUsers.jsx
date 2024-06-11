import { useContext, useEffect } from "react";
import { UserContext } from "../components/context/UserContext";

export const useFetchAllUsers = () => {
  const { setFetchedUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFetchedUsers(data.users);
        } else {
          console.error(`Failed to fetch users: ${data.message}`);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, [setFetchedUsers]);
};
