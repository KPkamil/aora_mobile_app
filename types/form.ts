import * as ImagePicker from "expo-image-picker";

export type CreatePostForm = {
  title: string;
  prompt: string;
  video?: ImagePicker.ImagePickerAsset | null;
  thumbnail?: ImagePicker.ImagePickerAsset | null;
};
