import { useContext } from "react";
import { ThreadContext, UserContext } from "../pages/ChatPage";

export const ThreadsRegistery = () => {
  const { existingThreads, setSelectedThread } = useContext(ThreadContext);
  const { setSelectedRecieverId } = useContext(UserContext);

  const handleClick = (selectedThread, participant) => {
    setSelectedRecieverId(participant.receiver._id);
    setSelectedThread(selectedThread);
  };

  return (
    <div className="message-threads">
      <h1>Threads</h1>
      {existingThreads.map((threads) =>
        threads.participants.map((participant) => (
          <ul
            key={participant._id}
            className="receiver"
            onClick={() => handleClick(threads, participant)}
          >
            <li>{participant.receiver.username}</li>
            <span>x</span>
          </ul>
        ))
      )}
    </div>
  );
};
