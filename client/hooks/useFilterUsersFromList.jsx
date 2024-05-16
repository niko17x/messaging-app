import { useEffect } from "react";

export const useFilterUsersFromList = ({
  fetchedUsers,
  authUser,
  receiverParticipants,
  setUpdatedFetchedUsers,
  renderedNewThread,
}) => {
  useEffect(() => {
    let removeAuthUserFromList = fetchedUsers.filter(
      (user) => user._id !== authUser._id
    );

    removeAuthUserFromList = removeAuthUserFromList.filter(
      (user) => !receiverParticipants.includes(user._id)
    );

    setUpdatedFetchedUsers(removeAuthUserFromList);
  }, [
    fetchedUsers,
    authUser,
    receiverParticipants,
    renderedNewThread,
    setUpdatedFetchedUsers,
  ]);
};
