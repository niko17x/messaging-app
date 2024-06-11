import { createContext, useState, useMemo, useEffect } from "react";
import { useFetchAuthUser } from "../../hooks/useFetchAuthUser";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedReceiverId, setSelectedRecieverId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isUserFocused, setIsUserFocused] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const { userData } = useFetchAuthUser();

  useEffect(() => {
    if (userData && userData._id) {
      setAuthUser(userData);
    }
  }, [userData, authUser]);

  const users = useMemo(
    () => ({
      selectedUserData,
      setSelectedUserData,
      selectedReceiverId,
      setSelectedRecieverId,
      isLoggedIn,
      setIsLoggedIn,
      setIsUserFocused,
      isUserFocused,
      fetchedUsers,
      setFetchedUsers,
      authUser,
    }),
    [
      selectedUserData,
      selectedReceiverId,
      isLoggedIn,
      isUserFocused,
      fetchedUsers,
      authUser,
    ]
  );

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};
