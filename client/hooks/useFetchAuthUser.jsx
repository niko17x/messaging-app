import { useEffect, useState } from "react";

export const useFetchAuthUser = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      setUserData(JSON.parse(storedUserInfo));
    }
  }, []);

  return userData;
};
