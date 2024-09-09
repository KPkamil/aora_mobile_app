import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

import { useGlobalContext } from "@context";
import { dislikePostRequest, likePostRequest } from "@lib";

type VideoCardHookProps = {
  refetch?: () => void;
  video: Models.Document;
};

export const useVideoCard = ({ video, refetch }: VideoCardHookProps) => {
  const [play, setPlay] = useState(false);

  const { user } = useGlobalContext();

  const { avatar, username } = video.creator;
  const { $id, title, liked_by, thumbnail, video: videoUrl } = video;

  const [isLiked, setIsLiked] = useState(false);

  const isMP4 = videoUrl?.endsWith(".mp4");

  useEffect(() => {
    setIsLiked(liked_by?.includes(user?.$id));
  }, [liked_by]);

  const changePlay = async (isPlaying: boolean) => setPlay(isPlaying);

  const likePost = async () => {
    if (!user?.$id || !$id) return;

    if (isLiked) {
      setIsLiked(false);
      await dislikePostRequest(video, user?.$id);
    } else {
      setIsLiked(true);
      await likePostRequest(video, user?.$id);
    }

    refetch?.();
  };

  return {
    play,
    title,
    isMP4,
    avatar,
    isLiked,
    username,
    videoUrl,
    likePost,
    thumbnail,
    changePlay,
  };
};
