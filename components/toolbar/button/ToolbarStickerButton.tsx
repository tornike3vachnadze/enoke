import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Button from "../../Button";
import { GestureResponderEvent } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureEvent,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ToolbarButtonProps } from "./type";

type Points = {
  x: number;
  y: number;
};
type Props = {
  onPressButton?: (
    e: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
} & ToolbarButtonProps;

const ToolbarStickerButton = ({
  onPressButton,
  onTouchDown,
  onTouchUp,
  scrollHeight,
  scrollOffset,
}: Props) => {
  const gesture = Gesture.Tap()
    .onBegin((e) => {})
    .onFinalize((e) => {
      if (onPressButton) {
        runOnJS(onPressButton)(e);
      }
    })
    .onTouchesCancelled(() => {
      if (onTouchUp) {
        runOnJS(onTouchUp);
      }
    });

  const animatedButton = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, scrollHeight, scrollHeight * 2],
      [1, 1, -3],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      }
    );
    return {
      opacity,
      transform: [{ scale: opacity }],
    };
  }, [scrollOffset.value]);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[]}>
        <Button.Square title="Sticker">
          <Image source={require("../../../assets/icons/sticker.png")} />
        </Button.Square>
      </Animated.View>
    </GestureDetector>
  );
};

export default ToolbarStickerButton;

const styles = StyleSheet.create({});
