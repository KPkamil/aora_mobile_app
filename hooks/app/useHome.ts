import { useGlobalContext } from "@context";
import { getAllPosts, getLatestPosts, useAppwrite } from "@lib";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useHome = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite({
    fn: getAllPosts,
  });

  const { data: latestPosts } = useAppwrite({
    fn: getLatestPosts,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return {
    user,
    posts,
    onRefresh,
    refreshing,
    latestPosts,
  };
};
