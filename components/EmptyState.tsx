import { router } from "expo-router";
import { View, Image, Text } from "react-native";

import { images } from "@constants";

import { CustomButton } from "./CustomButton";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-xl font-psemibold text-center text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title="Create video"
        containerStyles="w-full my-5"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};
