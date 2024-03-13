import { useRef } from "react";

export const MessageThreads = ({ onThreadSelect }) => {
  const threadId = useRef();

  const threads = [
    {
      id: 1,
      text: "this is a short description",
    },
    {
      id: 2,
      text: "this is a short description",
    },
    {
      id: 3,
      text: "this is a short description",
    },
    {
      id: 4,
      text: "this is a short description",
    },
    {
      id: 5,
      text: "this is a short description",
    },
    {
      id: 6,
      text: "this is a short description",
    },
  ];

  const handleClick = (thread) => {
    threadId.current = thread.id;
    onThreadSelect(thread.id);
  };

  return (
    <div className="message-threads">
      <h1>threads</h1>
      {threads.map((thread, index) => {
        return (
          <div key={index} onClick={() => handleClick(thread)}>
            <span> &#128507;</span>
            <div>{thread.text}</div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Selecting a thread should display the corresponding thread actively.
 */
