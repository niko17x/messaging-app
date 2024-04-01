import { useCallback, useContext } from "react";
import { UserContext } from "../pages/ChatPage.jsx";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser.jsx";

export const UsersRegistry = () => {
  const { fetchedUsers, setSelectedUserData } = useContext(UserContext);

  const { userData } = useFetchAuthUser();

  const handleClick = useCallback(
    (data) => {
      setSelectedUserData(data);
    },
    [setSelectedUserData]
  );

  return (
    <div className="users-list">
      <ul>
        <h1>Users</h1>
        <ul>
          {fetchedUsers
            .filter((user) => user._id !== userData._id)
            .map((user) => (
              <li key={user._id} onClick={() => handleClick(user)}>
                <img
                  src="../src/assets/images/profile-image-icon.png"
                  height={"25px"}
                />
                {user.username}
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
