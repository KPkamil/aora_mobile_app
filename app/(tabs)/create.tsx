import { ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@constants";
import { useCreate } from "@hooks";
import { CustomButton, FormField } from "@components";

const Create = () => {
  const { form, submit, uploading, openPicker, changeForm } = useCreate();

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView className="px-4 my-6">
          <Text className="text-2xl text-white font-psemibold">
            Upload video
          </Text>
          <FormField
            value={form.title}
            title="Video title"
            otherStyles="mt-10"
            placeholder="Give your video a catch title..."
            handleChangeText={(title) => changeForm("title", title)}
          />
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload video
            </Text>
            <TouchableOpacity onPress={() => openPicker("video")}>
              {form?.video ? (
                <Video
                  resizeMode={ResizeMode.COVER}
                  source={{ uri: form.video?.uri }}
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form?.thumbnail ? (
                <Image
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                  source={{ uri: form.thumbnail.uri }}
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <FormField
            value={form.prompt}
            title="AI prompt"
            otherStyles="mt-7"
            placeholder="The prompt you used to create this video"
            handleChangeText={(prompt) => changeForm("prompt", prompt)}
          />
          <CustomButton
            handlePress={submit}
            isLoading={uploading}
            containerStyles="mt-7"
            title="Submit & Publish"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
