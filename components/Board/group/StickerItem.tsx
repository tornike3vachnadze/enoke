import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { ImageSourcePropType } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
type DropPointType = GestureStateChangeEvent<PanGestureHandlerEventPayload> & {
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
};
type Props = {
  index: number;
  sticker: { name: string; uri: ImageSourcePropType };
  onDrop?: (e: DropPointType, stickerUri: ImageSourcePropType) => void;
};
const springConfig = { stiffness: 100, damping: 15 };
const StickerItem = ({ index, sticker, onDrop }: Props) => {
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .minDistance(0)
    .activeOffsetX(0)
    .activeOffsetY(0)
    .onBegin((e) => {
      scale.value = withSpring(1.1);

      startX.value = e.x;
      startY.value = e.y;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      translateX.value = withSpring(0, springConfig);
      translateY.value = withSpring(0, springConfig);
      startX.value = withSpring(0, springConfig);
      startY.value = withSpring(0, springConfig);
      scale.value = withTiming(0, { duration: 5 });
      if (onDrop) {
        runOnJS(onDrop)(
          {
            ...e,
            ...contentSize,
            startX: startX.value,
            startY: startY.value,
          },
          sticker.uri
        );
      }
    })
    .onTouchesUp(() => {
      scale.value = withSpring(1, springConfig);
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      //   opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View key={index} style={[animatedStyle]}>
        <Pressable
          onPress={() => {
            console.log("sticker", sticker);
          }}
        >
          <View
            style={styles.sticker}
            onLayout={({ nativeEvent }) => {
              setContentSize({
                width: nativeEvent.layout.width,
                height: nativeEvent.layout.height,
              });
            }}
          >
            <Image source={sticker.uri} />
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default StickerItem;

const styles = StyleSheet.create({
  sticker: { margin: 5, width: 26, height: 33, justifyContent: "center" },
});
