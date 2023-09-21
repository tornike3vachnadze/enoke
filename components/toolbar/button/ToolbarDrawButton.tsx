import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Button from "../../Button";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { ToolbarButtonProps } from "./type";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
  onPress?: () => void;
  active?: boolean;
  onTouchDown?: () => {};
  onTouchUp?: () => {};
};

const ToolbarDrawButton = ({
  onPress,
  active,
  scrollHeight,
  scrollOffset,
  enabled,
  onTouchUp,
}: ToolbarButtonProps) => {
  const gesture = Gesture.Tap()
    .onBegin((e) => {})
    .onFinalize((e) => {
      if (onPress) {
        runOnJS(onPress)(e);
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
      [0, scrollHeight * 0.7],
      [-5, 1],
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
    <Animated.View style={[]}>
      <GestureDetector gesture={gesture}>
        <Button.Square title="Draw" active={active}>
          <Image source={require("../../../assets/icons/pencil.png")} />
        </Button.Square>
      </GestureDetector>
    </Animated.View>
  );
};

export default ToolbarDrawButton;

const styles = StyleSheet.create({});
