import { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import { ThreadContext } from "../components/context/ThreadContext";

export const useCreateNewThread = () => {
  const { authUser, setSelectedUserData } = useContext(UserContext);
  const { setRenderedNewThread, setNewlyCreatedThreadId } =
    useContext(ThreadContext);

  const createNewThread = async (selectedUserData, localThreadId) => {
    try {
      if (authUser && selectedUserData) {
        const response = await fetch("/api/thread/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: authUser._id,
            receiver: selectedUserData._id,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Thread successfully created");
          setRenderedNewThread(true);
          localThreadId.current = data.newThread._id;
          // store data.newThread._id in state to hold value of newly created thread;
          setNewlyCreatedThreadId(data.newThread._id);
          setSelectedUserData("");
        } else {
          console.error(`${response.message}`);
        }
      } else {
        console.log(
          `userData: ${authUser} or selectedUserData: ${selectedUserData} not found`
        );
      }
    } catch (err) {
      console.error(`${err.message}`);
    }
  };
  return createNewThread;
};
