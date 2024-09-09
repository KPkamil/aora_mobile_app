import WebView from "react-native-webview";
import { ResizeMode, Video } from "expo-av";
import { Models } from "react-native-appwrite";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { icons } from "@constants";
import { useVideoCard } from "@hooks";

type VideoCardProps = {
  refetch?: () => void;
  video: Models.Document;
};

export const VideoCard = ({ video, refetch }: VideoCardProps) => {
  const {
    play,
    title,
    isMP4,
    avatar,
    isLiked,
    username,
    videoUrl,
    likePost,
    thumbnail,
    changePlay,
  } = useVideoCard({
    video,
    refetch,
  });

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-100 font-pregular"
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <AntDesign
            size={24}
            onPress={likePost}
            color={isLiked ? "red" : "white"}
            name={isLiked ? "heart" : "hearto"}
          />
        </View>
      </View>
      {play ? (
        isMP4 ? (
          <Video
            shouldPlay
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            className="w-full h-60 rounded-xl"
            source={{
              uri: videoUrl,
            }}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && status.didJustFinish) {
                changePlay(false);
              }
            }}
          />
        ) : (
          <WebView
            source={{ uri: videoUrl }}
            className="w-80 h-72 rounded-xl mt-5 bg-white/10"
          />
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => changePlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
