import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { searchPosts, useAppwrite } from "@lib";
import { EmptyState, SearchInput, VideoCard } from "@components";

const Search = () => {
  const { query } = useLocalSearchParams();

  const correctQuery = Array.isArray(query) ? query[0] : query;

  const { data: posts, refetch } = useAppwrite({
    fn: () => searchPosts(correctQuery),
  });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={correctQuery} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
