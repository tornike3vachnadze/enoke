import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IBoardItem, TAlignment, TStyle } from "../../../../types";
import { Portal } from "@gorhom/portal";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { TItemStyles } from "../../../../utils/styles/text";
type Props = {
  onSelect: (data: TAlignment) => void;
  item: IBoardItem | undefined;
  position: { x: number; y: number };
};

const list = [
  {
    id: 0,
    text: "Left",
    type: TAlignment.Left,
  },
  {
    id: 1,
    text: "Center",
    type: TAlignment.Center,
  },
  {
    id: 2,
    text: "Right",
    type: TAlignment.Right,
  },
];
const TAlignmentPicker = ({ position, item, onSelect }: Props) => {
  const [selected, setSelected] = useState(0);
  const handleSelect = (type: TAlignment) => {
    onSelect(type);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: position.x - 110,
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
          >
            <Text style={[{ fontWeight: "bold" }]}>{item.text}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </Portal>
  );
};

export default TAlignmentPicker;

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
    gap: 12,
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
