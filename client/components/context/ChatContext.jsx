import { createContext, useMemo, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageCreated, setMessageCreated] = useState(false);

  const chatData = useMemo(
    () => ({
      chatMessages,
      setChatMessages,
      messageCreated,
      setMessageCreated,
    }),
    [chatMessages, messageCreated]
  );

  return (
    <ChatContext.Provider value={chatData}>{children}</ChatContext.Provider>
  );
};
