import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = PropsWithChildren<{
  disableScroll?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

const VerticalScroll = ({ disableScroll, children, style }: Props) => {
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);
  const isEnable = useSharedValue(true);

  const gesture = Gesture.Pan()
    .enabled(isEnable.value)
    .onUpdate((e) => {
      translateY.value = e.translationY + startY.value;
    })
    .onEnd((e) => {
      startY.value = e.translationY;
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default VerticalScroll;

const styles = StyleSheet.create({});
