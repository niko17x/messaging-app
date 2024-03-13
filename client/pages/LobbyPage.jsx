import { useState } from "react";
import { Header } from "../components/Header";
import { MessageThreads } from "../components/MessageThreads";
import { Messenger } from "../components/Messenger";
import { UsersList } from "../components/UsersList";

export const LobbyPage = () => {
  const [threadId, setThreadId] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const onThreadSelect = (data) => {
    setThreadId(data);
  };

  const onUserSelect = (data) => {
    setSelectedUser(data);
  };

  return (
    <div className="lobby-page">
      <Header />
      <h1>Lobby</h1>
      <div className="chat-zone">
        <div className="chat-zone-left">
          <UsersList onUserSelect={onUserSelect} />
          <MessageThreads onThreadSelect={onThreadSelect} />
        </div>
        <Messenger threadId={threadId} selectedUser={selectedUser} />
      </div>
    </div>
  );
};
