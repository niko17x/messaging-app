import { useEffect, useState } from "react";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const UsersList = ({ onSelectedUserData, onSelectedThreadId }) => {
  const [listUsers, setListUsers] = useState([]);
  const [authUser, setAuthUser] = useState();
  const [sender, setSender] = useState("");

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    if (userData) {
      setAuthUser(userData.username);
      setSender(userData._id);
    }
  }, [userData]);

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
            (user) => user.username !== authUser
          );
          setListUsers(updatedListUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [authUser]);

  const handleClick = async (user, userId) => {
    onSelectedUserData(user);
    findThreadIdWithParticipants(userId);
  };

  const findThreadIdWithParticipants = async (userId) => {
    if (sender && userId) {
      try {
        const response = await fetch(
          `/api/thread/threads?sender=${sender}&receiver=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          onSelectedThreadId(data.existingThread._id);
        } else {
          onSelectedThreadId(null);
        }
      } catch (err) {
        // console.log(err.message);
        console.warn(err.message);
      }
    }
  };

  return (
    <div className="users-list">
      <ul>
        <h1>Users</h1>
        {listUsers.map((user) => (
          <li key={user._id} onClick={() => handleClick(user, user._id)}>
            <img
              src="../src/assets/images/profile-image-icon.png"
              alt="Profile"
              width="25"
              height="25"
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
