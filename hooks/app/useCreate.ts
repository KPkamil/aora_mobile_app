import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { createVideo } from "@lib";
import { CreatePostForm } from "@types";
import { useGlobalContext } from "@context";

export const useCreate = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    prompt: "",
    video: null,
    thumbnail: null,
  });

  const { user } = useGlobalContext();

  const changeForm = (key: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      aspect: [4, 3],
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
    });

    if (result.canceled) return;

    if (selectType === "image") {
      setForm((p) => ({ ...p, thumbnail: result.assets[0] }));
    }

    if (selectType === "video") {
      setForm((p) => ({ ...p, video: result.assets[0] }));
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert("Please fill all fields");
    }

    setUploading(true);

    try {
      await createVideo(form, user?.$id);

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (err) {
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      }
    } finally {
      setUploading(false);
      setForm({
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
      });
    }
  };

  return {
    form,
    submit,
    uploading,
    openPicker,
    changeForm,
  };
};
