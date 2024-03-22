import { useEffect, useState } from "react";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const MessageThreads = ({
  onFirstThreadId,
  onSelectedUserData,
  onSelectedThreadId,
}) => {
  const [threads, setThreads] = useState([]);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    const fetchThread = async () => {
      if (userData && userData._id) {
        try {
          const response = await fetch(`/api/thread/${userData._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          if (response.ok && data.thread) {
            setThreads(data.thread);
            data && onFirstThreadId(data.thread[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchThread();
  }, [userData, onFirstThreadId]);

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`/api/thread/delete/${threadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Thread successfully deleted: ${data.message}`);
      } else {
        console.log(`Thread failed to delete: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessages = async (threadId) => {
    try {
      const response = await fetch(`/api/messages/delete/${threadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (threadId) => {
    deleteThread(threadId);
    deleteMessages(threadId);
  };

  const handleClick = (participant, thread) => {
    onSelectedUserData(participant.receiver);
    onSelectedThreadId(thread._id);
  };

  return (
    <div className="message-threads">
      <h1>Threads</h1>
      {threads.map((thread) =>
        thread.participants.map((participant, index) => (
          <div key={`${thread._id}-${index}`} className="receiver">
            <div
              onClick={() =>
                // handleClick(thread._id, participant.receiver.username)
                handleClick(participant, thread)
              }
            >
              {participant.receiver.username}
            </div>
            {/* <button type="button" onClick={() => handleClick(thread._id)}> */}
            <button type="button" onClick={() => handleDelete(thread._id)}>
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
};
