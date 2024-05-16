import { useEffect } from "react";

export const useUniqueReceiverIds = (
  existingThreads,
  setReceiverParticipants
) => {
  useEffect(() => {
    const allReceiverIds = existingThreads.flatMap((thread) =>
      thread.participants.map((participant) => participant.receiver._id)
    );

    const uniqueRecieverIds = Array.from(new Set(allReceiverIds));

    setReceiverParticipants(uniqueRecieverIds);
  }, [existingThreads, setReceiverParticipants]);
};
