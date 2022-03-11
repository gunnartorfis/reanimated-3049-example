import React from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../App";
import StoryThumbnail from "../components/StoryThumbnail";
import { StoryType } from "../types/story";
import { SafeAreaView } from "react-native-safe-area-context";

export type HomeProps = NativeStackScreenProps<StackParams, "Home">;

const story: StoryType = {
  id: "1",
  video:
    "https://elasticbeanstalk-eu-west-1-566350007378.s3.eu-west-1.amazonaws.com/timatorg-web/videos/1_720.mp4",
  thumbnail:
    "https://elasticbeanstalk-eu-west-1-566350007378.s3.eu-west-1.amazonaws.com/timatorg-web/videos/1_720_thumbnail.png",
};

const storyWithAudio: StoryType = {
  id: "2",
  video:
    "https://elasticbeanstalk-eu-west-1-566350007378.s3.eu-west-1.amazonaws.com/timatorg-web/videos/2_720.mp4",
  thumbnail:
    "https://elasticbeanstalk-eu-west-1-566350007378.s3.eu-west-1.amazonaws.com/timatorg-web/videos/2_720_thumbnail.png",
};

const Home: React.FC<HomeProps> = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <StoryThumbnail story={story} thumbnail={story.thumbnail} />
    </SafeAreaView>
  );
};

export default Home;
