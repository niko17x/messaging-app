import { useEffect, useContext } from "react";
import { ThreadContext } from "../components/context/ThreadContext";
import { UserContext } from "../components/context/UserContext";
import { ChatContext } from "../components/context/ChatContext";

export const useFetchAllThreads = () => {
  const {
    // existingThreads,
    // defaultThreadId,
    setExistingThreads,
    setDefaultThreadId,
  } = useContext(ThreadContext);
  const { authUser } = useContext(UserContext);
  const { messageCreated } = useContext(ChatContext);

  useEffect(() => {
    const fetchAllThreads = async () => {
      if (authUser && authUser._id) {
        try {
          const response = await fetch(
            `/api/thread/all-threads/${authUser._id}`,
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
    if (authUser) {
      fetchAllThreads();
    }
  }, [authUser, messageCreated, setDefaultThreadId, setExistingThreads]);

  // return { existingThreads, defaultThreadId };
};
