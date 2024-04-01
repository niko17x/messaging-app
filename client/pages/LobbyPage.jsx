import { useCallback, useState, useEffect } from "react";
import { Header } from "../components/Header";
import { MessageThreads } from "../components/MessageThreads";
import { Messenger } from "../components/Messenger";
import { UsersList } from "../components/UsersList";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";

export const LobbyPage = () => {
  const [firstThreadId, setFirstThreadId] = useState("");
  const [selectedUserData, setSelectedUserData] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState("");

  // working on this first

  const [threads, setThreads] = useState([]);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    const fetchThread = async () => {
      if (userData) {
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
            setFirstThreadId(data.thread[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchThread();
  }, [userData]);

  const onSelectedUserData = useCallback((data) => {
    setSelectedUserData(data);
  }, []);

  const onSelectedThreadId = useCallback((data) => {
    setSelectedThreadId(data);
  }, []);

  console.log("lobbypage");

  return (
    <div className="lobby-page">
      <Header />
      <h1>Lobby</h1>
      <div className="chat-zone">
        <div className="chat-zone-left">
          <UsersList
            onSelectedUserData={onSelectedUserData}
            onSelectedThreadId={onSelectedThreadId}
          />
          <MessageThreads
            threads={threads}
            onSelectedUserData={onSelectedUserData}
            onSelectedThreadId={onSelectedThreadId}
            firstThreadId={firstThreadId}
          />
        </div>
        {(firstThreadId || selectedUserData) && (
          <Messenger
            firstThreadId={firstThreadId}
            selectedUserData={selectedUserData}
            selectedThreadId={selectedThreadId}
          />
        )}
      </div>
    </div>
  );
};
