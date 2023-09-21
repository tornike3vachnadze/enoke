import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IBoardItem, TStyle } from "../../../../types";
import { Portal } from "@gorhom/portal";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { TItemStyles } from "../../../../utils/styles/text";
type Props = {
  onSelect: (data: TStyle) => void;
  item: IBoardItem | undefined;
  position: { x: number; y: number };
};
type ColorItem = {
  id: number;
  color: string;
  border: string;
};
const list = [
  {
    id: 0,
    style: TItemStyles.largeHeading,
    text: "Large heading",
    type: TStyle.LargeHeading,
  },
  {
    id: 1,
    style: TItemStyles.normalHeading,
    text: "Normal heading",
    type: TStyle.NormalHeading,
  },
  {
    id: 2,
    style: TItemStyles.normal,
    text: "Normal text",
    type: TStyle.Normal,
  },
  {
    id: 3,
    style: TItemStyles.small,
    text: "Small text",
    type: TStyle.Small,
  },
  {
    id: 4,
    style: TItemStyles.qoute,
    text: "“Quote block”",
    type: TStyle.Qoute,
  },
];
const TStylePicker = ({ position, item, onSelect }: Props) => {
  const [selected, setSelected] = useState(0);
  const handleSelect = (type: TStyle) => {
    onSelect(type);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: position.x - 200,
      top: position.y - 60,
    };
  });
  return (
    <Portal>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={[styles.triangle]} />
        {list.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              handleSelect(item.type);
            }}
            style={{ marginBottom: 12 }}
          >
            <Text
              style={[
                item.style,
                { fontWeight: index < 2 ? "bold" : "normal" },
              ]}
            >
              {item.text}
            </Text>
          </Pressable>
        ))}
      </Animated.View>
    </Portal>
  );
};

export default TStylePicker;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 20,

    // height: 330,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    top: 70,
    right: -15,
    zIndex: 0,
  },
});
