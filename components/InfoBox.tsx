import { Text, View } from "react-native";

type InfoBoxProps = {
  title?: string;
  subtitle?: string;
  titleStyles?: string;
  containerStyles?: string;
};

export const InfoBox = ({
  title,
  subtitle,
  titleStyles,
  containerStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};
