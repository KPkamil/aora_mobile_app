import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

type AppwriteHookProps = {
  fn: () => Promise<Models.Document[] | undefined>;
};

export const useAppwrite = ({ fn }: AppwriteHookProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Models.Document[] | undefined>([]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch, isLoading };
};
