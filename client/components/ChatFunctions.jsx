import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { ThreadContext } from "./context/ThreadContext";
import { useCreateNewThread } from "../hooks/useCreateNewThread";
import { useCreateNewMessage } from "../hooks/useCreateNewMessage";
import { useValidateThreadExist } from "../hooks/useValidateThreadExists";

export const ChatFunctions = () => {
  const { defaultThreadId } = useContext(ThreadContext);
  const { selectedUserData, setIsUserFocused } = useContext(UserContext);

  const createNewThread = useCreateNewThread();
  const validateThreadExists = useValidateThreadExist(selectedUserData);
  const { message, setMessage, localThreadId, createNewMessage } =
    useCreateNewMessage();

  const validateMessageCreation = async () => {
    if (!validateThreadExists) {
      await createNewThread(selectedUserData, localThreadId);
      await createNewMessage(localThreadId);
      setIsUserFocused(false);
    } else {
      await createNewMessage(defaultThreadId);
    }
  };

  const validateIsThreadSelected = () => {
    // Return if there is no thread at all or a user has not been selected
    if (!defaultThreadId && !selectedUserData) {
      toast.error("Select a user to message", {
        toastId: "select-a-user-to-message",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateIsThreadSelected) {
      return;
    }

    await validateMessageCreation();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="message">
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};
