import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@constants";
import { useGlobalContext } from "@context";
import { getUserPosts, useAppwrite } from "@lib";
import { EmptyState, InfoBox, VideoCard } from "@components";

const Profile = () => {
  const { user, logout } = useGlobalContext();

  const { data: posts } = useAppwrite({
    fn: () => getUserPosts(user?.$id),
  });

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
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="w-full items-end mb-10"
            >
              <Image
                className="w-6 h-6"
                resizeMode="contain"
                source={icons.logout}
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                resizeMode="cover"
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username}
              titleStyles="text-lg"
              containerStyles="mt-5"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
                title={String(posts?.length || 0)}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
