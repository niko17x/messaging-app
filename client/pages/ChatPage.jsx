import { useContext } from "react";
import { ChatDisplay } from "../components/ChatDisplay";
import { Header } from "../components/Header";
import { ThreadsRegistery } from "../components/ThreadsRegistery";
import { UsersRegistry } from "../components/UsersRegistry";
import { useFetchAllMessages } from "../hooks/useFetchAllMessages";
import { useFetchAllThreads } from "../hooks/useFetchAllThreads";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";
import { ThreadContext } from "../components/context/ThreadContext";
import { ChatContext } from "../components/context/ChatContext";
import { UserContext } from "../components/context/UserContext";

// * Splitting context based on heavily re-rendered data can improve optimization. Note that any update to the context value will re-render all consumers *

// TODO: Offsetting bubble messages:
/**
 * Create a new key in message model that accepts "left" or "right" for message placement.
 * When new message is created, assign the new key to "left" or "right" based on the recipient.
 * When fetching and displaying all messages, assign a CSS class to "left" and "right" for UI.
 */

export const ChatPage = () => {
  // useEffect(() => {
  //   setRenderedNewThread(false);
  // }, [selectedUserData, selectedThread, setRenderedNewThread]);

  const { authUser } = useContext(UserContext);
  const { newlyCreatedThreadId, selectedThread, defaultThreadId } =
    useContext(ThreadContext);
  const { messageCreated } = useContext(ChatContext);

  useFetchAllUsers();
  useFetchAllThreads(authUser, messageCreated);

  useFetchAllMessages({
    newlyCreatedThreadId,
    selectedThread,
    defaultThreadId,
    messageCreated,
  });

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
