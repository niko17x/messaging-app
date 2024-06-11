export const focusDefaultThread = (
  thread,
  newlyCreatedThreadId,
  focusedThreadId,
  isUserFocused,
  existingThreads
) => {
  // focus on the newly created thread
  if (newlyCreatedThreadId) {
    return thread._id === newlyCreatedThreadId
      ? "user-selection receiver"
      : "receiver";
  }

  // focus the first item in the thread list when there is no focus and user is not focused
  if (!focusedThreadId && !isUserFocused) {
    return existingThreads[0]._id === thread._id
      ? "user-selection receiver"
      : "receiver";
  }

  // default focus behavior when user in user list is not focused
  return focusedThreadId === thread._id && !isUserFocused
    ? "user-selection receiver"
    : "receiver";
};
