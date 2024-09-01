import { Text, FlatList } from "react-native";
import { Models } from "react-native-appwrite";

type TrendingProps = {
  posts?: Models.Document[];
};

export const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
    />
  );
};
