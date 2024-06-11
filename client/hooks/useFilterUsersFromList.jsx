import { useEffect, useMemo } from "react";

export const useFilterUsersFromList = ({
  fetchedUsers,
  authUser,
  receiverParticipants,
  setUpdatedFetchedUsers,
  // renderedNewThread,
}) => {
  const filteredUsers = useMemo(() => {
    return fetchedUsers.filter(
      (user) =>
        user._id !== authUser._id && !receiverParticipants.includes(user._id)
    );
  }, [fetchedUsers, authUser, receiverParticipants]);

  useEffect(() => {
    setUpdatedFetchedUsers(filteredUsers);
  }, [filteredUsers, setUpdatedFetchedUsers]);
};
