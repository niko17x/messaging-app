import { useState, useEffect } from "react";

export const useFetchAllThreads = (
  userData,
  messageCreated,
  renderedNewThread
) => {
  const [existingThreads, setExistingThreads] = useState([]);
  const [defaultThreadId, setDefaultThreadId] = useState(null);

  useEffect(() => {
    const fetchAllThreads = async () => {
      if (userData && userData._id) {
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
            if (newThreads.length > 0) {
              setDefaultThreadId(newThreads[0]._id);
            } else {
              setDefaultThreadId(null);
            }
          } else {
            console.error(`Failed to fetch threads: ${data.message}`);
          }
        } catch (err) {
          console.error(`Error while retrieving threads: ${err.message}`);
        }
      }
    };
    if (userData) {
      fetchAllThreads();
    }
  }, [userData, renderedNewThread, messageCreated]);

  return { existingThreads, defaultThreadId };
};
