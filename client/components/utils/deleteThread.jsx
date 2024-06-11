import { toast } from "react-toastify";

export const deleteThread = async (threadId, setRenderedNewThread) => {
  try {
    const response = await fetch(`/api/thread/delete/${threadId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setRenderedNewThread((prev) => !prev);
      toast.success("Thread successfully delete", {
        toastId: "thread-successfully-deleted",
      });
    } else {
      console.error(data.message);
    }
  } catch (err) {
    console.error(`Failed to delete thread: ${err.message}`);
  }
};
