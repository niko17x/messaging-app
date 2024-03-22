import { useCallback, useState } from "react";
import { Header } from "../components/Header";
import { MessageThreads } from "../components/MessageThreads";
import { Messenger } from "../components/Messenger";
import { UsersList } from "../components/UsersList";

export const LobbyPage = () => {
  const [firstThreadId, setFirstThreadId] = useState("");
  const [selectedUserData, setSelectedUserData] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState("");

  const onFirstThreadId = useCallback((data) => {
    setFirstThreadId(data);
  }, []);

  const onSelectedUserData = (data) => {
    setSelectedUserData(data);
  };

  const onSelectedThreadId = (data) => {
    setSelectedThreadId(data);
  };

  return (
    <div className="lobby-page">
      <Header />
      <h1>Lobby</h1>
      <div className="chat-zone">
        <div className="chat-zone-left">
          <UsersList
            onSelectedUserData={onSelectedUserData}
            // onExistingThreadId={onExistingThreadId}
            onSelectedThreadId={onSelectedThreadId}
          />
          <MessageThreads
            onFirstThreadId={onFirstThreadId}
            onSelectedUserData={onSelectedUserData}
            onSelectedThreadId={onSelectedThreadId}
          />
        </div>
        {firstThreadId || selectedUserData ? (
          <Messenger
            firstThreadId={firstThreadId}
            selectedUserData={selectedUserData}
            selectedThreadId={selectedThreadId}
          />
        ) : (
          <Messenger
            firstThreadId={firstThreadId}
            selectedThreadId={selectedUserData}
          />
        )}
      </div>
    </div>
  );
};
