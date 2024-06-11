import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messageCreated, setMessageCreated] = useState(false);

  const chatData = { messageCreated, setMessageCreated };

  return (
    <ChatContext.Provider value={chatData}>{children}</ChatContext.Provider>
  );
};
