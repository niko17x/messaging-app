import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { ChatContext } from "./context/ChatContext";
import { ThreadContext } from "./context/ThreadContext";

export const ChatFunctions = () => {
  const [message, setMessage] = useState("");
  const localThreadId = useRef(null);

  const {
    selectedThread,
    setRenderedNewThread,
    defaultThreadId,
    existingThreads,
    setNewlyCreatedThreadId,
  } = useContext(ThreadContext);
  const { selectedUserData, setSelectedUserData, setIsUserFocused, authUser } =
    useContext(UserContext);
  const { setMessageCreated } = useContext(ChatContext);

  const createNewThread = async () => {
    try {
      if (authUser && selectedUserData) {
        const response = await fetch("/api/thread/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: authUser._id,
            receiver: selectedUserData._id,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Thread successfully created");
          setRenderedNewThread(true);
          localThreadId.current = data.newThread._id;
          // store data.newThread._id in state to hold value of newly created thread;
          setNewlyCreatedThreadId(data.newThread._id);
          setSelectedUserData("");
        } else {
          console.error(`${response.message}`);
        }
      } else {
        console.log(
          `userData: ${authUser} or selectedUserData: ${selectedUserData} not found`
        );
      }
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  const createNewMessage = async () => {
    const activeThreadId = selectedThread
      ? selectedThread._id
      : localThreadId.current
      ? localThreadId.current
      : defaultThreadId;

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

  const isThreadExists = () => {
    let threadExists = false;
    if (selectedUserData) {
      existingThreads.forEach((thread) => {
        const participantFound = thread.participants.find(
          (participant) => participant.receiver._id === selectedUserData._id
        );
        if (participantFound) {
          threadExists = true;
        }
      });
    } else {
      threadExists = true;
    }
    return threadExists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Return if there is no thread at all or a user has not been selected
    if (!defaultThreadId && !selectedUserData) {
      toast.error("Select a user to message", {
        toastId: "select-a-user-to-message",
      });
      return;
    }

    if (!isThreadExists()) {
      await createNewThread();
      await createNewMessage();
      setIsUserFocused(false);
    } else {
      await createNewMessage();
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
