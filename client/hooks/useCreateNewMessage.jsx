import { useContext, useRef, useState } from "react";
import { ChatContext } from "../components/context/ChatContext";
import { ThreadContext } from "../components/context/ThreadContext";

export const useCreateNewMessage = () => {
  const [message, setMessage] = useState("");
  const localThreadId = useRef(null);
  const { setMessageCreated } = useContext(ChatContext);
  const { selectedThread } = useContext(ThreadContext);

  const createNewMessage = async (defaultThreadId) => {
    const activeThreadId =
      selectedThread?._id || localThreadId.current || defaultThreadId;

    try {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeThreadId,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Message successfully created");
        setMessageCreated((prev) => !prev);
        setMessage("");
      } else {
        console.log(`Message failed to create: ${data.message}`);
      }
    } catch (err) {
      console.error(`${err.message}`);
    }
  };
  return { message, setMessage, localThreadId, createNewMessage };
};
