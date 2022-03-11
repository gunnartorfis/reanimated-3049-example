import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Video } from "expo-av";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";
import { StackParams } from "../App";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

export type StoryProps = NativeStackScreenProps<StackParams, "Story">;

const Story: React.FC<StoryProps> = ({ navigation, route }) => {
  const { story } = route.params;
  const [status, setStatus] = React.useState<any>({
    shouldPlay: true,
  });

  const isGestureActive = useSharedValue(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const navigateBack = () => {
    navigation.goBack();
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: ({ translationX, translationY }) => {
      isGestureActive.value = true;
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, WINDOW_HEIGHT]) ===
        WINDOW_HEIGHT;

      isGestureActive.value = false;
      if (goBack) {
        runOnJS(() => {
          navigateBack();
        });
      } else {
        translateX.value = withSpring(0, { velocity: velocityX });
        translateY.value = withSpring(0, { velocity: velocityY });
      }
    },
  });

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, WINDOW_HEIGHT],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      backgroundColor: "transparent",
      transform: [
        {
          translateX: translateX.value * scale,
        },
        {
          translateY: translateY.value * scale,
        },
        {
          scale,
        },
      ],
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement id={story.id} style={{ flex: 1 }}>
          {!story.video ? (
            <Animated.Image
              source={{ uri: story.thumbnail }}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                },
                borderStyle,
              ]}
            />
          ) : (
            <AnimatedVideo
              style={[StyleSheet.absoluteFill, borderStyle]}
              source={{
                uri: story.video,
              }}
              useNativeControls={false}
              resizeMode="cover"
              isLooping
              onLoad={() => {
                console.log("LOAD FINISHED");
              }}
              onLoadStart={() => {
                console.log("LOAD STARTEd");
              }}
              status={{
                ...status,
                shouldPlay: true,
              }}
              // status={status}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          )}
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Story;
