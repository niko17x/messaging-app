import { useCallback, useState } from "react";
import { Header } from "../components/Header";
import { MessageThreads } from "../components/MessageThreads";
import { Messenger } from "../components/Messenger";
import { UsersList } from "../components/UsersList";

export const LobbyPage = () => {
  const [firstThreadId, setFirstThreadId] = useState("");
  const [selectedUserData, setSelectedUserData] = useState("");

  console.log(firstThreadId.participants);

  const onFirstThreadId = useCallback((data) => {
    setFirstThreadId(data);
  }, []);

  const onSelectedThreadId = (data) => {
    setSelectedUserData(data);
  };

  return (
    <div className="lobby-page">
      <Header />
      <h1>Lobby</h1>
      <div className="chat-zone">
        <div className="chat-zone-left">
          <UsersList onSelectedThreadId={onSelectedThreadId} />
          <MessageThreads
            onFirstThreadId={onFirstThreadId}
            onSelectedThreadId={onSelectedThreadId}
          />
        </div>
        {firstThreadId || selectedUserData ? (
          <Messenger
            firstThreadId={firstThreadId}
            selectedUserData={selectedUserData}
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
