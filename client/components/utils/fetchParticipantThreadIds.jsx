export const fetchParticipantThreadIds = async (
  authUser,
  userId,
  onSelectedThreadId
) => {
  if (authUser._id && userId) {
    try {
      const response = await fetch(
        `/api/thread/threads?sender=${authUser._id}&receiver=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        onSelectedThreadId(data.existingThread._id);
      } else {
        onSelectedThreadId(null);
      }
    } catch (err) {
      console.warn(err.message);
    }
  }
};
