import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { StoryProps } from "../screens/Story";
import { StoryType } from "../types/story";

type StoryThumbnailProps = {
  story: StoryType;
  thumbnail?: string;
};

const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  story,
  thumbnail,
}) => {
  const navigation = useNavigation<StoryProps["navigation"]>();

  const onPress = async () => {
    navigation.push("Story", { story });
  };

  return (
    <Pressable onPress={onPress}>
      <SharedElement id={story.id}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={[
            styles.thumb,
            {
              borderColor: "blue",
            },
          ]}
        />
      </SharedElement>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
  },
});

export default StoryThumbnail;
