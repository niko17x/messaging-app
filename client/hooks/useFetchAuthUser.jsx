// Retrieving authenticated user payload from local storage (stored by logging in / registering)

import { useEffect, useState } from "react";

export const useFetchAuthUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");

      if (storedUserInfo) {
        setUserData(JSON.parse(storedUserInfo));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { userData };
};

// export const useFetchAuthUser = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = () => {
//       try {
//         const storedUserInfo = localStorage.getItem("userInfo");
//         if (storedUserInfo) {
//           setUserData(JSON.parse(storedUserInfo));
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return { userData, loading, error };
// };
