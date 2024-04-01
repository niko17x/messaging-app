import { ChatFunctions } from "./ChatFunctions";

export const ChatDisplay = () => {
  return (
    <div className="messenger">
      <div className="header">
        <img
          src="../src/assets/images/profile-image-icon.png"
          height="30px"
          alt=""
        />
      </div>
      <div className="display-messages"></div>
      <ChatFunctions />
    </div>
  );
};
