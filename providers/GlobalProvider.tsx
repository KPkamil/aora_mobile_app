import { router } from "expo-router";
import { Models } from "react-native-appwrite";
import { PropsWithChildren, useEffect, useState } from "react";

import { GlobalContext } from "@context";
import { getCurrentUser, signOut } from "@lib";

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

  const login = (user: Models.Document) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isLoggedIn,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
