import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  isLoading?: boolean;
  textStyles?: string;
  handlePress: () => void;
  containerStyles?: string;
};

export const CustomButton = ({
  title,
  isLoading,
  textStyles,
  handlePress,
  containerStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
