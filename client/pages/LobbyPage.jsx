import { Header } from "../components/Header";
import { MessageThreads } from "../components/MessageThreads";
import { Messenger } from "../components/Messenger";

export const LobbyPage = () => {
  return (
    <div className="main-page">
      <Header />
      <h1>Lobby</h1>
      <MessageThreads />
      <Messenger />
    </div>
  );
};
