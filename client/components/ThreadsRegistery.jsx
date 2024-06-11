import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { ThreadContext } from "./context/ThreadContext";
import { deleteThread } from "./utils/deleteThread";
import { deleteMessages } from "./utils/deleteMessages";
import { focusDefaultThread } from "./utils/focusDefaultThread";

export const ThreadsRegistery = () => {
  const [focusedThreadId, setFocusedThreadId] = useState("");

  const {
    setSelectedUserData,
    setSelectedRecieverId,
    isUserFocused,
    setIsUserFocused,
    authUser,
  } = useContext(UserContext);

  const {
    existingThreads,
    setSelectedThread,
    setRenderedNewThread,
    newlyCreatedThreadId,
    setNewlyCreatedThreadId,
  } = useContext(ThreadContext);

  const displayIfNoThreads = () => {
    return (
      <div>
        <p>No threads!</p>
      </div>
    );
  };

  const handleDelete = (threadId) => {
    deleteThread(threadId, setRenderedNewThread);
    deleteMessages(threadId);
  };

  const handleClick = (selectedThread, participant) => {
    setSelectedRecieverId(participant.receiver._id);
    setSelectedThread(selectedThread);
    setFocusedThreadId(selectedThread._id);
    isUserFocused && setIsUserFocused(false);
    setNewlyCreatedThreadId("");
    setSelectedUserData("");
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
                className={focusDefaultThread(
                  threads,
                  newlyCreatedThreadId,
                  focusedThreadId,
                  isUserFocused,
                  existingThreads
                )}
                onClick={() => handleClick(threads, participant)}
              >
                <li>
                  {participant.receiver._id === authUser._id
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
