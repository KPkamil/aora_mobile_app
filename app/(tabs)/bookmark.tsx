import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@context";
import { getLikedPosts, useAppwrite } from "@lib";
import { EmptyState, SearchInput, VideoCard } from "@components";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite({
    fn: () => getLikedPosts(user?.$id),
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} refetch={refetch} />}
        ListEmptyComponent={() => (
          <EmptyState
            showButton={false}
            title="No videos found"
            subtitle="Add videos to your bookmarks to see them here"
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-2xl font-psemibold text-white">
              Saved videos
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search your saved videos" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
