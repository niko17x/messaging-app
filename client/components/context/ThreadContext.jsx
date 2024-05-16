import { createContext, useMemo, useState } from "react";
import { useFetchAllThreads } from "../../hooks/useFetchAllThreads";
import { useFetchAuthUser } from "../../hooks/useFetchAuthUser";

export const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [newlyCreatedThreadId, setNewlyCreatedThreadId] = useState("");
  const [renderedNewThread, setRenderedNewThread] = useState("");

  const { userData } = useFetchAuthUser();

  const { existingThreads, defaultThreadId } = useFetchAllThreads(
    userData,
    renderedNewThread
  );

  const combinedThreadData = useMemo(
    () => ({
      existingThreads,
      defaultThreadId,
      setSelectedThread,
      selectedThread,
      renderedNewThread,
      setRenderedNewThread,
      newlyCreatedThreadId,
      setNewlyCreatedThreadId,
    }),
    [
      selectedThread,
      renderedNewThread,
      newlyCreatedThreadId,
      existingThreads,
      defaultThreadId,
    ]
  );

  return (
    <ThreadContext.Provider value={combinedThreadData}>
      {children}
    </ThreadContext.Provider>
  );
};
