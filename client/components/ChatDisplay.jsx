import { useContext } from "react";
import { ChatFunctions } from "./ChatFunctions";
import { UserContext } from "./context/UserContext";
import { ChatContext } from "./context/ChatContext";

export const ChatDisplay = () => {
  const { chatMessages } = useContext(ChatContext);

  const { selectedUserData } = useContext(UserContext);

  // display empty chat screen when focusing on a user from user list
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
