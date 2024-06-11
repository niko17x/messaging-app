export const deleteMessages = async (threadId) => {
  if (!threadId) {
    console.log("ThreadId not found while trying to delete messages");
    return;
  }

  try {
    const response = await fetch(`/api/messages/delete/${threadId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log();
    }
  } catch (err) {
    console.error(err.message);
  }
};
