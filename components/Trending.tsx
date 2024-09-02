import { useState } from "react";
import WebView from "react-native-webview";
import { ResizeMode, Video } from "expo-av";
import { Models } from "react-native-appwrite";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
} from "react-native";

import { icons } from "@constants";
import { zoomInAnimation, zoomOutAnimation } from "@lib";

type TrendingItemProps = {
  item: Models.Document;
  activeItem?: Models.Document;
};

const TrendingItem = ({ item, activeItem }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  const isMP4 = item.video?.endsWith(".mp4");

  return (
    <Animatable.View
      duration={500}
      className="mr-5"
      animation={
        activeItem?.$id === item.$id ? zoomInAnimation : zoomOutAnimation
      }
    >
      {play ? (
        isMP4 ? (
          <Video
            shouldPlay
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            source={{
              uri: item.video,
            }}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <WebView
            source={{ uri: item.video }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          />
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative justify-center items-center"
        >
          <ImageBackground
            resizeMode="cover"
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type TrendingProps = {
  posts?: Models.Document[];
};

export const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts?.[1]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Models.Document>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
    />
  );
};
