import { useEffect, useState } from "react";

export const useMeId = () => {
  const [userId, setUserId] = useState(null as number);

  useEffect(() => {
    if (window) {
      setUserId(parseInt(localStorage.getItem("userId")));
    }
  }, [typeof window]);

  return userId;
};
