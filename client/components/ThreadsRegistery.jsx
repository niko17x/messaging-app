import { useCallback, useContext, useState } from "react";
import { ChatContext, ThreadContext, UserContext } from "../pages/ChatPage";
import { toast } from "react-toastify";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const ThreadsRegistery = () => {
  const [focusedThreadId, setFocusedThreadId] = useState("");

  const { userData } = useFetchAuthUser();

  const { setSelectedRecieverId, setSelectedUserData } =
    useContext(UserContext);
  const { isUserFocused, setIsUserFocused } = useContext(ChatContext);
  const {
    existingThreads,
    setSelectedThread,
    setRenderedNewThread,
    newlyCreatedThreadId,
    setNewlyCreatedThreadId,
  } = useContext(ThreadContext);

  const handleClick = (selectedThread, participant) => {
    setSelectedRecieverId(participant.receiver._id);
    setSelectedThread(selectedThread);
    setFocusedThreadId(selectedThread._id);
    isUserFocused && setIsUserFocused(false);
    setNewlyCreatedThreadId("");
    setSelectedUserData("");
  };

  const displayIfNoThreads = () => {
    return (
      <div>
        <p>No threads!</p>
      </div>
    );
  };

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
    if (!threadId) {
      console.log("ThreadId not found while trying to delete messages");
      return;
    }

    try {
      const response = await fetch(`/api/messages/delete/${threadId}`, {
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

  const handleDelete = (threadId) => {
    deleteThread(threadId);
    deleteMessages(threadId);
  };

  const focusDefaultThread = (thread) => {
    // focus on the newly created thread
    if (newlyCreatedThreadId) {
      return thread._id === newlyCreatedThreadId
        ? "user-selection receiver"
        : "receiver";
    }

    // focus the first item in the thread list when there is no focus and user is not focused
    if (!focusedThreadId && !isUserFocused) {
      return existingThreads[0]._id === thread._id
        ? "user-selection receiver"
        : "receiver";
    }

    // default focus behavior when user in user list is not focused
    return focusedThreadId === thread._id && !isUserFocused
      ? "user-selection receiver"
      : "receiver";
  };

  return (
    <div className="message-threads">
      <h1>Threads</h1>
      {existingThreads.length > 0
        ? existingThreads.map((threads) =>
            threads.participants.map((participant) => (
              <ul
                key={threads._id}
                // display visual que when threads match & user is not in focus (prevent focusing on user & thread same time)
                className={focusDefaultThread(threads)}
                onClick={() => handleClick(threads, participant)}
              >
                <li>
                  {participant.receiver._id === userData._id
                    ? participant.sender.username
                    : participant.receiver.username}
                </li>
                <div onClick={() => handleDelete(threads._id)}>x</div>
              </ul>
            ))
          )
        : displayIfNoThreads()}
    </div>
  );
};
