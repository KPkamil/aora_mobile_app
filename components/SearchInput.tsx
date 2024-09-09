import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "@constants";

type SearchInputProps = {
  placeholder?: string;
  initialQuery?: string;
};

export const SearchInput = ({
  placeholder,
  initialQuery,
}: SearchInputProps) => {
  const [query, setQuery] = useState(initialQuery || "");

  const pathname = usePathname();

  const handleSearch = () => {
    if (!query) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database."
      );
    }

    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center flex-row space-x-4">
      <TextInput
        value={query}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        placeholder={placeholder ?? "Search for a video topic"}
        className="text-base mt-0.5 text-white flex-1 font-pregular"
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
