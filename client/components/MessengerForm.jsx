import { useState } from "react";
import { createNewMessage } from "./utils/createNewMessage";
import { determineActiveThread } from "./utils/determineActiveThread";
import { createNewThread } from "./utils/createNewThread";

export const MessengerForm = ({
  firstThreadId,
  selectedThreadId,
  onMessengerFormData,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      console.log("Message input cannot be empty");
      return;
    }

    let activeThreadId = selectedThreadId ? selectedThreadId : firstThreadId;

    determineActiveThread(selectedThreadId, activeThreadId, createNewThread());

    createNewMessage(activeThreadId, message, setMessage, onMessengerFormData);
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
