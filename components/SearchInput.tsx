import { View, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "@constants";

type FormFieldProps = {
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
};

export const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
}: FormFieldProps) => {
  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
