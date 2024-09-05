import { Models } from "react-native-appwrite";
import { useContext, createContext } from "react";

type GlobalContextProps = {
  logout: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Models.Document | null;
  login: (user: Models.Document) => void;
};

const initialState: GlobalContextProps = {
  user: null,
  login: () => {},
  isLoading: true,
  logout: () => {},
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
