import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../components/context/ChatContext";

export const useFetchAllMessages = ({
  newlyCreatedThreadId,
  selectedThread,
  defaultThreadId,
}) => {
  // const { setChatMessages } = useContext(ChatContext);
  const { messageCreated } = useContext(ChatContext);

  const [chatMessages, setChatMessages] = useState([]);
  // const [messageCreated, setMessageCreated] = useState(false);

  useEffect(() => {
    let threadId;

    if (newlyCreatedThreadId) {
      threadId = newlyCreatedThreadId;
    } else if (selectedThread) {
      threadId = selectedThread._id;
    } else {
      threadId = defaultThreadId;
    }

    const fetchAllMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${threadId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setChatMessages(data.messages);
        } else {
          console.warn(`${response.message}`);
        }
      } catch (err) {
        console.error(`Error while retreiving messages: ${err.message}`);
      }
    };
    threadId && fetchAllMessages();
  }, [
    defaultThreadId,
    selectedThread,
    messageCreated,
    newlyCreatedThreadId,
    setChatMessages,
  ]);

  return { chatMessages };
};
