import { Models } from "react-native-appwrite";
import { useContext, createContext } from "react";

type GlobalContextProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Models.Document | null;
};

const initialState: GlobalContextProps = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
};

export const GlobalContext = createContext(initialState);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
