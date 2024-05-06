import { createContext, useEffect, useMemo, useState } from "react";
import { ChatDisplay } from "../components/ChatDisplay";
import { Header } from "../components/Header";
import { ThreadsRegistery } from "../components/ThreadsRegistery";
import { UsersRegistry } from "../components/UsersRegistry";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const UserContext = createContext(null);
export const ThreadContext = createContext(null);
export const ChatContext = createContext(null);

export const ChatPage = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedReceiverId, setSelectedRecieverId] = useState(null);
  const [existingThreads, setExistingThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newlyCreatedThreadId, setNewlyCreatedThreadId] = useState("");
  const [renderedNewThread, setRenderedNewThread] = useState("");
  const [defaultThreadId, setDefaultThreadId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageCreated, setMessageCreated] = useState(false);
  const [isUserFocused, setIsUserFocused] = useState(null);

  const { userData } = useFetchAuthUser();

  // * Splitting context based on heavily re-rendered data can improve optimization. Note that any update to the context value will re-render all consumers *

  // TODO => When logged in as 'niko' and having started a thread with 'zoe', thread is successfully created as well as correct receiver name in threads. However, when logging in as 'zoe', the created thread from 'niko' continues to show the name of the receiver in niko's point of view (which is zoe). I need to display the receiver as 'niko' instead of zoe when the authenticated user name matches the name of the reciever.

  const users = useMemo(
    () => ({
      fetchedUsers,
      selectedUserData,
      setSelectedUserData,
      setSelectedRecieverId,
      selectedReceiverId,
    }),
    [fetchedUsers, selectedUserData, selectedReceiverId]
  );
  354633445677982;
  const threadData = useMemo(
    () => ({
      existingThreads,
      setExistingThreads,
      setSelectedThread,
      selectedThread,
      renderedNewThread,
      setRenderedNewThread,
      defaultThreadId,
      newlyCreatedThreadId,
      setNewlyCreatedThreadId,
    }),
    [
      existingThreads,
      selectedThread,
      renderedNewThread,
      defaultThreadId,
      newlyCreatedThreadId,
    ]
  );

  const chatData = useMemo(
    () => ({
      chatMessages,
      setMessageCreated,
      setIsUserFocused,
      isUserFocused,
    }),
    [chatMessages, isUserFocused]
  );

  useEffect(() => {
    setRenderedNewThread(false);
  }, [selectedUserData, selectedThread]);

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFetchedUsers(data.users);
        } else {
          console.error(`Failed to fetch users: ${data.message}`);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  // fetch all threads
  useEffect(() => {
    const fetchAllThreads = async () => {
      if (userData._id) {
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
            setExistingThreads(newThreads);

            if (newThreads.length > 0) {
              setDefaultThreadId(newThreads[0]._id);
            } else {
              setDefaultThreadId(null);
            }
          } else {
            console.error(`${data.message}`);
          }
        } catch (err) {
          console.error(`${err.message}`);
        }
      }
    };
    fetchAllThreads();
  }, [userData, setExistingThreads, renderedNewThread, messageCreated]);

  // fetch all messages
  useEffect(() => {
    let threadId;

    if (newlyCreatedThreadId) {
      threadId = newlyCreatedThreadId;
    } else if (selectedThread) {
      threadId = selectedThread._id;
    } else {
      threadId = defaultThreadId;
    }

    const fetchAllMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${threadId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setChatMessages(data.messages);
        } else {
          console.warn(`${response.message}`);
        }
      } catch (err) {
        console.error(`Error while retreiving messages: ${err.message}`);
      }
    };
    threadId && fetchAllMessages();
  }, [defaultThreadId, selectedThread, messageCreated, newlyCreatedThreadId]);

  // console.log("ChatPage");
  return (
    <UserContext.Provider value={users}>
      <ThreadContext.Provider value={threadData}>
        <ChatContext.Provider value={chatData}>
          <div className="lobby-page">
            <Header />
            <h1>Chat</h1>
            <div className="chat-zone">
              <div className="chat-zone-left">
                <UsersRegistry />
                <ThreadsRegistery />
              </div>
              <ChatDisplay />
            </div>
          </div>
        </ChatContext.Provider>
      </ThreadContext.Provider>
    </UserContext.Provider>
  );
};
