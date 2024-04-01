import { useState } from "react";

export const MessengerForm = ({
  firstThreadId,
  createThread,
  selectedThreadId,
  onMessengerFormData,
}) => {
  const [message, setMessage] = useState("");

  const createMessage = async (activeThreadId) => {
    try {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, activeThreadId }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("");
        onMessengerFormData(data);
        console.log(`Message successfuly created: ${data.message}`);
      } else {
        console.error(`Message failed to create: ${data.message}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      console.log("Message input cannot be empty");
      return;
    }

    let activeThreadId = selectedThreadId ? selectedThreadId : firstThreadId;

    if (selectedThreadId === null) {
      const activeThreadResponse = await createThread();
      activeThreadId = activeThreadResponse;
    }

    if (!activeThreadId) {
      console.error(`Failed to retrieve activeThreadId: ${activeThreadId}`);
      return;
    }

    createMessage(activeThreadId);
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
