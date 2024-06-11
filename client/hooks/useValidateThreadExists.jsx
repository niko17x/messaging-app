import { useContext } from "react";
import { ThreadContext } from "../components/context/ThreadContext";

export const useValidateThreadExist = (selectedUserData) => {
  const { existingThreads } = useContext(ThreadContext);

  const validateThreadExists = (selectedUserData) => {
    if (!selectedUserData) {
      return true;
    }

    // Replaced the forEach loop with some. The some method is more appropriate here as it returns true as soon as it finds a matching element, which makes the code more efficient
    return existingThreads.some((thread) =>
      thread.participants.some(
        (participant) => participant.receiver._id === selectedUserData._id
      )
    );
  };

  return validateThreadExists(selectedUserData);
};
