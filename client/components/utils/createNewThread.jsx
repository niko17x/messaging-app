export const createNewThread = async (sender, receiver) => {
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
