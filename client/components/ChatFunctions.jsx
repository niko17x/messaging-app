import { useContext, useEffect, useState } from "react";
import { ThreadContext, UserContext } from "../pages/ChatPage";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const ChatFunctions = () => {
  const [message, setMessage] = useState("");
  const [localExistingThreads, setLocalExistingThreads] = useState([]);

  const { selectedUserData, selectedReceiverId } = useContext(UserContext);
  const { setExistingThreads, selectedThread } = useContext(ThreadContext);

  const { userData } = useFetchAuthUser();

  // new thread should be created after user sends first message
  const createNewThread = async () => {
    try {
      if (userData && selectedUserData) {
        const response = await fetch("/api/thread/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: userData._id,
            receiver: selectedUserData._id,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.info(`${data.message}`);
        } else {
          console.error(`${data.message}`);
        }
      } else {
        console.log(
          `userData: ${userData} or selectedUserData: ${selectedUserData} not found`
        );
      }
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  const createNewMessage = async () => {
    try {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: selectedThread ? selectedThread._id : null,
          message,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  useEffect(() => {
    // fetch all threads
    const fetchAllThreads = async () => {
      if (userData._id) {
        try {
          const response = await fetch(
            `/api/thread/all-threads/${userData._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            const newThreads = data.existingThread;

            setExistingThreads((prevThreads) =>
              JSON.stringify(prevThreads) === JSON.stringify(newThreads)
                ? prevThreads
                : newThreads
            );
            setLocalExistingThreads(newThreads);
          } else {
            console.error(`${data.message}`);
          }
        } catch (err) {
          console.error(`${err.message}`);
        }
      }
    };
    fetchAllThreads();
  }, [userData, setExistingThreads]);

  const validateThreadExists = () => {
    let threadExists = false;
    if (selectedUserData) {
      localExistingThreads.forEach((thread) => {
        const participantFound = thread.participants.find(
          (participant) => participant.receiver._id === selectedUserData._id
        );
        if (participantFound) {
          threadExists = true;
        }
      });
    }
    return threadExists;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateThreadExists()) {
      createNewThread();
      createNewMessage();
      console.log("first");
    } else {
      createNewMessage();
      console.log("second");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="message">
        <input
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};
