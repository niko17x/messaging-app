// ! Component not currently in use

export const DeleteThread = () => {
  // confirmed => set state to true
  const confirmThreadDeletion = () => {
    // setConfirmedThreadDeleted(true);
  };

  // cancelled => hide modal
  const cancelThreadDeletion = () => {
    // setDisplayDeleteThreadModal(false);
  };

  return (
    <div className="delete-thread">
      <p>Confirm thread deletion</p>
      <div>
        <button onClick={confirmThreadDeletion}>Confirm</button>
        <button onClick={cancelThreadDeletion}>Cancel</button>
      </div>
    </div>
  );
};
