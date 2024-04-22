import { useCallback, useContext, useEffect, useState } from "react";
import { ChatContext, ThreadContext, UserContext } from "../pages/ChatPage.jsx";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser.jsx";

export const UsersRegistry = () => {
  const [focusedUser, setFocusedUser] = useState("");
  const [receiverParticipants, setReceiverParticipants] = useState([]);
  const [updatedFetchedUsers, setUpdatedFetchedUsers] = useState([]);

  const { fetchedUsers, setSelectedUserData } = useContext(UserContext);
  const { renderedNewThread, existingThreads } = useContext(ThreadContext);
  const { setIsUserFocused, isUserFocused } = useContext(ChatContext);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    const allReceiverIds = existingThreads.flatMap((thread) =>
      thread.participants.map((participant) => participant.receiver._id)
    );

    const uniqueRecieverIds = Array.from(new Set(allReceiverIds));

    setReceiverParticipants(uniqueRecieverIds);
  }, [existingThreads]);

  const handleClick = useCallback(
    (data) => {
      setSelectedUserData(data);
      setIsUserFocused(true);
      setFocusedUser(data._id);
    },
    [setSelectedUserData, setIsUserFocused]
  );

  useEffect(() => {
    let removeAuthUserFromList = fetchedUsers.filter(
      (user) => user._id !== userData._id
    );

    removeAuthUserFromList = removeAuthUserFromList.filter(
      (user) => !receiverParticipants.includes(user._id)
    );

    setUpdatedFetchedUsers(removeAuthUserFromList);
  }, [fetchedUsers, userData._id, receiverParticipants, renderedNewThread]);

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
