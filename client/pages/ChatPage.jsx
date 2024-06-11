import { ChatDisplay } from "../components/ChatDisplay";
import { Header } from "../components/Header";
import { ThreadsRegistery } from "../components/ThreadsRegistery";
import { UsersRegistry } from "../components/UsersRegistry";
import { useFetchAllThreads } from "../hooks/useFetchAllThreads";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";

// * Splitting context based on heavily re-rendered data can improve optimization. Note that any update to the context value will re-render all consumers *

// TODO: Offsetting bubble messages:
/**
 * Create a new key in message model that accepts "left" or "right" for message placement.
 * When new message is created, assign the new key to "left" or "right" based on the recipient.
 * When fetching and displaying all messages, assign a CSS class to "left" and "right" for UI.
 */

export const ChatPage = () => {
  useFetchAllUsers();
  useFetchAllThreads();

  console.log("parent");
  return (
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
  );
};
