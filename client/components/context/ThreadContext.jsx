import { createContext, useMemo, useState } from "react";

export const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [newlyCreatedThreadId, setNewlyCreatedThreadId] = useState("");
  const [renderedNewThread, setRenderedNewThread] = useState("");
  const [existingThreads, setExistingThreads] = useState([]);
  const [defaultThreadId, setDefaultThreadId] = useState(null);

  const combinedThreadData = useMemo(
    () => ({
      existingThreads,
      setExistingThreads,
      defaultThreadId,
      setDefaultThreadId,
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
