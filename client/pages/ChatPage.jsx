import { createContext, useEffect, useMemo, useState } from "react";
import { ChatDisplay } from "../components/ChatDisplay";
import { Header } from "../components/Header";
import { ThreadsRegistery } from "../components/ThreadsRegistery";
import { UsersRegistry } from "../components/UsersRegistry";

export const UserContext = createContext(null);
export const ThreadContext = createContext(null);

export const ChatPage = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedReceiverId, setSelectedRecieverId] = useState(null);
  const [existingThreads, setExistingThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const userData = useMemo(
    () => ({
      fetchedUsers,
      selectedUserData,
      setSelectedUserData,
      setSelectedRecieverId,
      selectedReceiverId,
    }),
    [fetchedUsers, selectedUserData, selectedReceiverId]
  );
  const threadData = useMemo(
    () => ({
      existingThreads,
      setExistingThreads,
      setSelectedThread,
      selectedThread,
    }),
    [existingThreads, selectedThread]
  );

  // retreive user list upon mount
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

  // retreive thread list

  // console.log("ChatPage");
  return (
    <UserContext.Provider value={userData}>
      <ThreadContext.Provider value={threadData}>
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
      </ThreadContext.Provider>
    </UserContext.Provider>
  );
};
