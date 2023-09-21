import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../../Button";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import TextPlaceholder from "../placeholder/TextPlaceholder";
import MediaPlaceholder from "../placeholder/MediaPlaceholder";
import { ToolbarButtonProps } from "./type";
type Points = {
  x: number;
  y: number;
};
type Props = {
  onDrop?: (
    e: GestureStateChangeEvent<PanGestureHandlerEventPayload> & {
      width?: number;
      height?: number;
      startX?: number;
      startY?: number;
    }
  ) => void;
  onDrag?: (
    e: GestureUpdateEvent<PanGestureHandlerEventPayload> & {
      width?: number;
      height?: number;
      startX?: number;
      startY?: number;
    }
  ) => void;
  onCreate?: (
    e: GestureUpdateEvent<PanGestureHandlerEventPayload> &
      GestureStateChangeEvent<PanGestureHandlerEventPayload> & {
        width?: number;
        height?: number;
        startX?: number;
        startY?: number;
      }
  ) => void;
};
const text = "Hold me to Start typing...";
const ToolbarVideoButton = ({
  onDrop,
  onTouchDown,
  onTouchUp,
  scrollHeight,
  scrollOffset,
  enabled,
}: ToolbarButtonProps) => {
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isDrag = useSharedValue(false);
  const [isShow, setIsShow] = useState(false);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1);
  const gesture = Gesture.Pan()
    .enabled(enabled ?? true)
    .minDistance(0)
    .activateAfterLongPress(300)
    .onBegin((e) => {
      if (onTouchDown) {
        runOnJS(onTouchDown)();
      }
      scale.value = 1;

      translateX.value = e.x;
      translateY.value = e.y;
      startX.value = e.x;
      startY.value = e.y;
    })
    .onChange((e) => {
      runOnJS(setIsShow)(true);

      scale.value = withSpring(1.02);
      translateX.value = e.translationX + startX.value;
      translateY.value = e.translationY + startY.value;
    })
    .onEnd((e) => {
      scale.value = withSpring(0);

      if (onDrop)
        runOnJS(onDrop)({
          ...e,
          ...contentSize,
          startX: startX.value,
          startY: startY.value,
        });
    })
    .onTouchesUp(() => {
      runOnJS(setIsShow)(false);
      if (onTouchUp) {
        runOnJS(onTouchUp)();
      }
    })
    .onTouchesCancelled(() => {
      runOnJS(setIsShow)(false);
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
  const animatedButton = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [scrollHeight * 0.25, scrollHeight * 0.9],
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
        <Animated.View style={[]}>
          <Button.Square title="Video">
            <Image source={require("../../../assets/icons/image.png")} />
          </Button.Square>
        </Animated.View>
      </GestureDetector>
      {isShow && (
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
            <MediaPlaceholder />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ToolbarVideoButton;

const styles = StyleSheet.create({});
