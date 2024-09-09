import { ImagePickerAsset } from "expo-image-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Models,
  Query,
  Storage,
} from "react-native-appwrite";

import { CreatePostForm, CreateUserPayload, SignInPayload } from "@types";

import { handleError } from "./utils";

export const config = {
  platform: process.env.PLATFORM,
  endpoint: process.env.ENDPOINT,
  storageId: process.env.STORAGE_ID,
  projectId: process.env.PROJECT_ID,
  databaseId: process.env.DATABASE_ID,
  userCollectionId: process.env.USER_COLLECTION_ID,
  videoCollectionId: process.env.VIDEO_COLLECTION_ID,
} as Record<string, string>;

if (Object.values(config).some((value) => !value)) {
  throw new Error("Missing config values");
}

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const storage = new Storage(client);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserPayload) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        email,
        username,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );

    return newUser;
  } catch (err) {
    handleError(err);
  }
};

export const signIn = async ({ email, password }: SignInPayload) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (err) {
    handleError(err);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    console.error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (err) {
    handleError(err);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (err) {
    handleError(err);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (err) {
    handleError(err);
  }
};

export const getUserPosts = async (userId?: string) => {
  try {
    if (!userId) throw new Error("Missing user ID");

    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (err) {
    handleError(err);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (err) {
    handleError(err);
  }
};

export const getFilePreview = async (
  fileId: string,
  type: "video" | "image"
) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (err) {
    handleError(err);
  }
};

export const uploadFile = async (
  file: ImagePickerAsset | null | undefined,
  type: "video" | "image"
) => {
  if (!file || !file.mimeType) return;

  const asset = {
    uri: file.uri,
    type: file.mimeType,
    name: file.fileName ?? "file",
    size: file.fileSize ?? 0,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (err) {
    handleError(err);
  }
};

export const createVideo = async (form: CreatePostForm, userId?: string) => {
  try {
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(form.video, "video"),
      uploadFile(form.thumbnail, "image"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        creator: userId,
        video: videoUrl,
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailUrl,
      }
    );

    return newPost;
  } catch (err) {
    handleError(err);
  }
};

export const getLikedPosts = async (userId?: string) => {
  try {
    if (!userId) throw new Error("Missing user ID");

    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.contains("liked_by", userId)]
    );

    return posts.documents;
  } catch (err) {
    handleError(err);
  }
};

export const likePostRequest = async (
  post: Models.Document,
  userId?: string
) => {
  try {
    if (!userId) throw new Error("Missing user ID");

    const liked_by = [...post.liked_by, userId];

    const updatedPost = await databases.updateDocument(
      config.databaseId,
      config.videoCollectionId,
      post.$id,
      {
        liked_by,
      }
    );

    return updatedPost;
  } catch (err) {
    handleError(err);
  }
};

export const dislikePostRequest = async (
  post: Models.Document,
  userId?: string
) => {
  try {
    if (!userId) throw new Error("Missing user ID");

    const liked_by = post.liked_by.filter((id: string) => id !== userId);

    const updatedPost = await databases.updateDocument(
      config.databaseId,
      config.videoCollectionId,
      post.$id,
      {
        liked_by,
      }
    );

    return updatedPost;
  } catch (err) {
    handleError(err);
  }
};
