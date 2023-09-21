import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../../Button";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import AudioPlaceholder from "../placeholder/AudioPlaceholder";
import { ToolbarButtonProps } from "./type";
type Points = {
  x: number;
  y: number;
};

const ToolbarButton = ({
  onDrop,
  onTouchDown,
  onTouchUp,
  scrollOffset,
  scrollHeight,
  children,
  draggableComponent,
}: ToolbarButtonProps) => {
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  //   const [isShow, setIsShow] = useState(false);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isShow = useSharedValue(false);
  const gesture = Gesture.Pan()
    .minDistance(0)
    .activateAfterLongPress(300)
    .onBegin((e) => {
      if (onTouchDown) {
        runOnJS(onTouchDown)();
      }
      //   runOnJS(setIsShow)(true);
      scale.value = 1;

      translateX.value = e.x;
      translateY.value = e.y;
      startX.value = e.x;
      startY.value = e.y;
    })
    .onChange((e) => {
      isShow.value = true;
      scale.value = withSpring(1.05);
      translateX.value = e.translationX + startX.value;
      translateY.value = e.translationY + startY.value;
    })
    .onEnd((e) => {
      if (onDrop)
        runOnJS(onDrop)({
          ...e,
          ...contentSize,
          startX: startX.value,
          startY: startY.value,
        });
    })
    .onTouchesUp(() => {
      isShow.value = false;

      if (onTouchUp) {
        runOnJS(onTouchUp)();
      }
    })
    .onTouchesCancelled(() => {
      isShow.value = false;

      if (onTouchUp) {
        runOnJS(onTouchUp)();
      }
    })
    .onFinalize(() => {
      scale.value = 0;
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: isShow.value ? withTiming(1, { duration: 20 }) : withSpring(0),
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  const animatedButton = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [scrollHeight * 0.6, scrollHeight * 1.1],
      [1, -4],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      opacity,
      transform: [{ scale: opacity }],
    };
  }, [scrollOffset.value]);
  return (
    <View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[]}>{children}</Animated.View>
      </GestureDetector>

      <Animated.View
        className={"w-0 h-0 absolute -z-10"}
        style={[animatedStyle]}
      >
        <View
          className="w-auto h-auto absolute"
          onLayout={({ nativeEvent }) => {
            setContentSize({
              width: nativeEvent.layout.width,
              height: nativeEvent.layout.height,
            });
          }}
        >
          {draggableComponent}
        </View>
      </Animated.View>
    </View>
  );
};

export default ToolbarButton;

const styles = StyleSheet.create({});
