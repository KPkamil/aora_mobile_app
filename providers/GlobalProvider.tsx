import { Models } from "react-native-appwrite";
import { PropsWithChildren, useEffect, useState } from "react";

import { getCurrentUser } from "@lib";
import { GlobalContext } from "@context";

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);

        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    user,
    isLoading,
    isLoggedIn,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
