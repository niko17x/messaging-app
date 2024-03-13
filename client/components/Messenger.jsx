import { useEffect, useState } from "react";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const Messenger = ({ threadId, selectedUser }) => {
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();

  const { userData } = useFetchAuthUser();

  const messages = [
    {
      id: 1,
      message: "Hey, how is your weekend?",
    },
    {
      id: 2,
      message: "My weekend was pretty good, thanks.",
    },
    {
      id: 3,
      message: "Hey, how is your weekend?",
    },
    {
      id: 4,
      message: "My weekend was pretty good, thanks.",
    },
    {
      id: 5,
      message: "Hey, how is your weekend?",
    },
    {
      id: 6,
      message: "My weekend was pretty good, thanks.",
    },
  ];

  useEffect(() => {
    if (userData) {
      setSender(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedUser) {
      setReceiver(selectedUser._id);
    }
  }, [selectedUser]);

  const fetchThread = async () => {
    console.log(sender, receiver);
    try {
      const response = await fetch("api/thread/thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, receiver }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.newThread);
      } else {
        console.error(`Failed to fetch or create thread: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const displayMessage = () => {
    return messages.map((message, index) => {
      return (
        message.id === threadId && (
          <div key={index}>
            <div>{message.message}</div>
          </div>
        )
      );
    });
  };

  const handleClick = () => {
    fetchThread();
  };

  return (
    <div className="messenger">
      <div className="header">
        <span></span>
        {receiver}
        <img
          src="../src/assets/images/profile-image-icon.png"
          height="30px"
          alt=""
        />
      </div>
      <div className="display-messages">{displayMessage()}</div>
      <form action="">
        <label htmlFor="message">
          <input type="text" name="message" id="message" />
        </label>
        <button type="button">Send</button>
      </form>
      <button type="button" onClick={handleClick}>
        Start Chat
      </button>
    </div>
  );
};

/**
 * Retrieve messages from MDB and display in message area.
 * If current thread does not exist between the 2 users, sender can initiate thread by clicking 'Start Chat'.
 */
