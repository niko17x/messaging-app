import { useEffect, useState } from "react";

export const useFetchUsersList = async (authUser) => {
  const [listUsers, setListUsers] = useState([]);

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
          const updatedListUsers = data.users.filter(
            (user) => user.username !== authUser.username
          );
          setListUsers(updatedListUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [authUser]);

  return listUsers;
};
