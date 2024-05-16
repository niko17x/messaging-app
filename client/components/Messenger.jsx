import { useContext, useEffect, useState } from "react";
import { MessengerForm } from "./MessengerForm";
import { UserContext } from "./context/UserContext";

export const Messenger = ({
  firstThreadId,
  selectedUserData,
  selectedThreadId,
}) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [messages, setMessages] = useState([]);
  const [messengerFormData, setMessengerFormData] = useState("");

  const { authUser } = useContext(UserContext);

  const onMessengerFormData = (data) => {
    setMessengerFormData(data);
  };

  useEffect(() => {
    authUser && setSender(authUser._id);
    selectedUserData && setReceiver(selectedUserData._id);

    if (firstThreadId || selectedUserData) {
      setReceiver(selectedUserData._id);
      setReceiverName(
        selectedUserData
          ? selectedUserData.username
          : firstThreadId.participants[0].receiver.username
      );
    }
  }, [authUser, selectedUserData, firstThreadId]);

  const createThread = async () => {
    if (!sender || !receiver) {
      console.error("Sender or receiver is not defined.");
      return;
    }

    try {
      const response = await fetch("/api/thread/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, receiver }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.newThread._id;
      } else {
        console.error(`Failed to fetch or create thread: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMessagesFromActiveThread = async () => {
      // ? Fails to display correct messages b/c firstThreadId is by default, being shown for all users where a thread does not currently exist.
      if (firstThreadId || selectedThreadId) {
        const activeThreadId = selectedThreadId
          ? selectedThreadId
          : firstThreadId._id;

        if (activeThreadId) {
          try {
            const response = await fetch(`/api/messages/${activeThreadId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await response.json();
            if (response.ok) {
              setMessages(data.messages);
            }
          } catch (err) {
            console.error(err.message);
          }
        } else {
          console.log("activeThreadId not found");
          return;
        }
      }
    };
    fetchMessagesFromActiveThread();
  }, [firstThreadId, selectedThreadId, messengerFormData]);

  console.log("messenger");

  return (
    <div className="messenger">
      <div className="header">
        {receiverName}
        <img
          src="../src/assets/images/profile-image-icon.png"
          height="30px"
          alt=""
        />
      </div>
      <div className="display-messages">
        {messages.map((message) => (
          <div key={message._id}>{message.message}</div>
        ))}
      </div>
      <MessengerForm
        firstThreadId={firstThreadId}
        selectedUserData={selectedUserData}
        createThread={createThread}
        selectedThreadId={selectedThreadId}
        onMessengerFormData={onMessengerFormData}
      />
    </div>
  );
};
