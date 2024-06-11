export const createNewMessage = async (
  activeThreadId,
  message,
  setMessage,
  onMessengerFormData
) => {
  try {
    const response = await fetch("/api/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, activeThreadId }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("");
      onMessengerFormData(data);
      console.log(`Message successfuly created: ${data.message}`);
    } else {
      console.error(`Message failed to create: ${data.message}`);
    }
  } catch (err) {
    console.error(err.message);
  }
};
