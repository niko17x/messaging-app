export const determineActiveThread = async (
  selectedThreadId,
  activeThreadId,
  createThread
) => {
  if (selectedThreadId === null) {
    const activeThreadResponse = await createThread();
    activeThreadId = activeThreadResponse;
  }

  if (!activeThreadId) {
    console.error(`Failed to retrieve activeThreadId: ${activeThreadId}`);
    return;
  }
};
