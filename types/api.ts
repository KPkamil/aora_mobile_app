export type Post = {
  title: string;
  video: string;
  prompt: string;
  creator: Creator;
  thumbnail: string;
};

type Creator = {
  email: string;
  avatar: string;
  username: string;
};
