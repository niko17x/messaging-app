import { useState } from "react";

export const MessengerForm = ({ firstThreadId, selectedUserData }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      console.log("Message input cannot be empty");
      return;
    }

    const activeThreadId = selectedUserData ? selectedUserData : firstThreadId;

    if (!activeThreadId) {
      console.error(`Failed to retrieve activeThreadId: ${activeThreadId}`);
      return;
    }

    try {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, activeThreadId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
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
