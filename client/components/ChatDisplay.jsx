import { useContext } from "react";
import { ChatFunctions } from "./ChatFunctions";
import { UserContext } from "./context/UserContext";
import { useFetchAllMessages } from "../hooks/useFetchAllMessages";
import { ThreadContext } from "./context/ThreadContext";

export const ChatDisplay = () => {
  const { selectedUserData } = useContext(UserContext);
  const { newlyCreatedThreadId, selectedThread, defaultThreadId } =
    useContext(ThreadContext);

  const { chatMessages } = useFetchAllMessages({
    newlyCreatedThreadId,
    selectedThread,
    defaultThreadId,
  });

  // display empty chat screen when focusing on a user from user lista'''''
  const displayEmptyChatScreen = () => {
    return selectedUserData ? (
      <div className="send-message-intro">
        Send a message to start a new thread with {selectedUserData.firstName}!
      </div>
    ) : (
      chatMessages.map((message) => {
        return <li key={message._id}>{message.message}</li>;
      })
    );
  };

  return (
    <div className="messenger">
      <div className="display-messages">{displayEmptyChatScreen()}</div>
      <ChatFunctions />
    </div>
  );
};
