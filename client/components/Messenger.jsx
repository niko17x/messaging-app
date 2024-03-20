import { useEffect, useState } from "react";
import { useFetchAuthUser } from "../hooks/useFetchAuthUser";
import { MessengerForm } from "./MessengerForm";

export const Messenger = ({ firstThreadId, selectedUserData }) => {
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [receiverName, setReceiverName] = useState("");
  const [messages, setMessages] = useState([]);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    userData && setSender(userData._id);
    selectedUserData && setReceiver(selectedUserData._id);

    if (firstThreadId || selectedUserData) {
      setReceiver(selectedUserData._id);
      setReceiverName(
        selectedUserData
          ? selectedUserData.username
          : firstThreadId.participants[0].receiver.username
      );
    }
  }, [userData, selectedUserData, firstThreadId]);

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

      if (!response.ok) {
        console.error(`Failed to fetch or create thread: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const initializeNewChat = () => {
  //   if (receiverDetail) {
  //     return (
  //       <div className="display-message">
  //         <button type="button" onClick={() => createThread()}>
  //           {`Start chat with ${receiverDetail}?`}
  //         </button>
  //       </div>
  //     );
  //   }
  // };

  useEffect(() => {
    // Default messenger load from thread[0]
    const fetchMessagesFromActiveThread = async () => {
      if (firstThreadId || selectedUserData) {
        const activeThreadId = selectedUserData
          ? selectedUserData._id
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
          return;
        }
      }
    };
    fetchMessagesFromActiveThread();
  }, [firstThreadId, selectedUserData]);

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
      />
    </div>
  );
};
