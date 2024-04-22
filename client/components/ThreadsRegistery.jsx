import { useCallback, useContext, useState } from "react";
import { ChatContext, ThreadContext, UserContext } from "../pages/ChatPage";
import { toast } from "react-toastify";

export const ThreadsRegistery = () => {
  const [focusedThreadId, setFocusedThreadId] = useState("");

  const { setSelectedRecieverId } = useContext(UserContext);
  const { existingThreads, setSelectedThread, setRenderedNewThread } =
    useContext(ThreadContext);
  const { isUserFocused, setIsUserFocused } = useContext(ChatContext);

  const handleClick = (selectedThread, participant) => {
    setSelectedRecieverId(participant.receiver._id);
    setSelectedThread(selectedThread);
    setFocusedThreadId(selectedThread._id);
    isUserFocused && setIsUserFocused(false);
  };

  const displayIfNoThreads = () => {
    return (
      <div>
        <p>No threads!</p>
      </div>
    );
  };

  // todo: when deleting thread/messages, I am getting an error from server
  const deleteThread = useCallback(
    async (threadId) => {
      try {
        const response = await fetch(`/api/thread/delete/${threadId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setRenderedNewThread((prev) => !prev);
          toast.success("Thread successfully delete", {
            toastId: "thread-successfully-deleted",
          });
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(`Failed to delete thread: ${err.message}`);
      }
    },
    [setRenderedNewThread]
  );

  const deleteMessages = async (threadId) => {
    try {
      const response = await fetch(`/api/messages/${threadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Todo: Revised how to handle deleting thread/messages by using useEffect to trigger deletion based on the state confirmedThreadDeleted but currently doing nothing when being invoked.

  const handleDelete = (threadId) => {
    deleteThread(threadId);
    deleteMessages(threadId);
  };

  return (
    <div className="message-threads">
      <h1>Threads</h1>
      {existingThreads.length > 0
        ? existingThreads.map((threads) =>
            threads.participants.map((participant) => (
              <ul
                key={threads._id}
                className={
                  focusedThreadId === threads._id && !isUserFocused
                    ? "user-selection receiver"
                    : "receiver"
                }
                onClick={() => handleClick(threads, participant)}
              >
                <li>{participant.receiver.username}</li>
                <div onClick={() => handleDelete(threads._id)}>x</div>
              </ul>
            ))
          )
        : displayIfNoThreads()}
    </div>
  );
};
