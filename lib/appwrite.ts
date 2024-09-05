import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

import { CreateUserPayload, SignInPayload } from "@types";

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
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
  }
};

export const signIn = async ({ email, password }: SignInPayload) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (err) {
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
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
      config.videoCollectionId
    );

    return posts.documents;
  } catch (err) {
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
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
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
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
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
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
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (err) {
    if (typeof err === "string") {
      console.error(err);
      throw new Error(err);
    }
  }
};
