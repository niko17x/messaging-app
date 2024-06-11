import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useFetchUsersList } from "../hooks/useFetchUsersList";
import { fetchParticipantThreadIds } from "./utils/fetchParticipantThreadIds";

export const UsersList = ({ onSelectedUserData, onSelectedThreadId }) => {
  const { authUser } = useContext(UserContext);

  const listUsers = useFetchUsersList(authUser);

  const handleClick = async (user, userId) => {
    onSelectedUserData(user);
    fetchParticipantThreadIds(userId, onSelectedThreadId);
  };

  return (
    <div className="users-list">
      <ul>
        <h1>Users</h1>
        {listUsers?.map((user) => (
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
