import { useCallback, useContext, useState } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { ThreadContext } from "./context/ThreadContext.jsx";
import { useFilterUsersFromList } from "../hooks/useFilterUsersFromList.jsx";
import { useUniqueReceiverIds } from "../hooks/useUniqueReceiverIds.jsx";

export const UsersRegistry = () => {
  // local state
  const [focusedUser, setFocusedUser] = useState("");
  const [receiverParticipants, setReceiverParticipants] = useState([]);
  const [updatedFetchedUsers, setUpdatedFetchedUsers] = useState([]);

  const {
    setSelectedUserData,
    fetchedUsers,
    setIsUserFocused,
    isUserFocused,
    authUser,
  } = useContext(UserContext);
  const { renderedNewThread, existingThreads, setSelectedThread } =
    useContext(ThreadContext);

  useUniqueReceiverIds(existingThreads, setReceiverParticipants);

  useFilterUsersFromList({
    fetchedUsers,
    authUser,
    receiverParticipants,
    setUpdatedFetchedUsers,
    renderedNewThread,
  });

  const handleClick = useCallback(
    (data) => {
      setSelectedUserData(data);
      setIsUserFocused(true);
      setFocusedUser(data._id);
      setSelectedThread(null);
    },
    [setSelectedUserData, setIsUserFocused, setSelectedThread]
  );

  return (
    <div className="users-list">
      <ul>
        <h1>Users</h1>
        <ul>
          {updatedFetchedUsers.map((user) => (
            <li
              className={
                focusedUser === user._id && isUserFocused
                  ? "user-selection"
                  : null
              }
              key={user._id}
              onClick={() => handleClick(user)}
            >
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
