import { Image, ImageSourcePropType, Text, View } from "react-native";

type TabIconProps = {
  name: string;
  color: string;
  focused: boolean;
  icon: ImageSourcePropType;
};

export const TabIcon = ({ icon, name, color, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        tintColor={color}
        className="w-6 h-6"
        resizeMode="contain"
      />
      <Text
        style={{ color }}
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};
