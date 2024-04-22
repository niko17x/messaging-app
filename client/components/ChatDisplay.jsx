import { useContext } from "react";
import { ChatFunctions } from "./ChatFunctions";
import { ChatContext } from "../pages/ChatPage";

export const ChatDisplay = () => {
  const { chatMessages } = useContext(ChatContext);

  return (
    <div className="messenger">
      <div className="header">
        <img
          src="../src/assets/images/profile-image-icon.png"
          height="30px"
          alt=""
        />
      </div>
      <div className="display-messages">
        {chatMessages.map((message) => {
          return <li key={message._id}>{message.message}</li>;
        })}
      </div>
      <ChatFunctions />
    </div>
  );
};
