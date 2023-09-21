import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Portal } from "@gorhom/portal";
import { DarkColor, LightColor } from "../../../../utils/styles/color";
import { IBoardItem } from "../../../../types";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  onSelect: (data: ColorItem) => void;
  item: IBoardItem | undefined;
  position: { x: number; y: number };
};
type ColorItem = {
  id: number;
  color: string;
  border: string;
};
const TBackdropColorPicker = ({ onSelect, item, position }: Props) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (data: ColorItem) => {
    setSelected(data.id);
    onSelect(data);
  };
  const handleSelectDark = (data: ColorItem) => {
    setSelected(data.id + LightColor.length);
    onSelect(data);
  };

  useEffect(() => {
    if (item && item.type == "text" && item.content.style) {
      const lightIndex = LightColor.findIndex(
        (a) => a.color == item.content.style?.backdrop
      );
      if (lightIndex == -1) {
        const darkIndex = DarkColor.findIndex(
          (a) => a.color == item.content.style?.backdrop
        );
        setSelected(darkIndex + LightColor.length);
      } else setSelected(lightIndex);
    }

    return () => {};
  }, []);

  const renderLightItem = ({
    item,
    index,
  }: {
    item: ColorItem;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => handleSelect(item)}
        style={{ marginRight: (index + 1) % 5 == 0 ? 0 : 1 }}
      >
        <View
          style={[
            styles.pressable,
            { borderColor: selected == index ? "black" : "transparent" },
          ]}
        >
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.color,
                borderColor: item.border,
              },
            ]}
          ></View>
        </View>
      </Pressable>
    );
  };
  const renderDarkItem = ({
    item,
    index,
  }: {
    item: ColorItem;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => handleSelectDark(item)}
        style={{ marginRight: (index + 1) % 5 == 0 ? 0 : 1 }}
      >
        <View
          style={[
            styles.pressable,
            {
              borderColor:
                selected == index + LightColor.length ? "black" : "transparent",
            },
          ]}
        >
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.color,
                borderColor: item.border,
              },
            ]}
          ></View>
        </View>
      </Pressable>
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: position.x - 290,
      top: position.y - 10,
    };
  });
  return (
    <Portal>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={[styles.triangle]} />
        <FlatList
          data={LightColor}
          key={"color"}
          extraData={LightColor}
          keyExtractor={(item: ColorItem) => `dc-${item.id}`}
          renderItem={renderLightItem}
          // ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
          numColumns={5}
          contentContainerStyle={{ gap: 1 }}
          style={{ padding: 20 }}
        />
        <View style={styles.line} />
        <FlatList
          data={DarkColor}
          extraData={DarkColor}
          key={"color-dark"}
          keyExtractor={(item: ColorItem) => `dc-${item.id}`}
          renderItem={renderDarkItem}
          // ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
          numColumns={5}
          contentContainerStyle={{ gap: 1 }}
          style={{ padding: 20 }}
        />
      </Animated.View>
    </Portal>
  );
};

export default TBackdropColorPicker;

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    position: "absolute",

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
    top: 20,
    right: -15,
    zIndex: 0,
  },
  item: {
    width: 35,
    height: 28,
    borderWidth: 1,
    borderRadius: 5,
  },
  pressable: {
    padding: 3,
    borderRadius: 8,
    borderColor: "transparent",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#e8eaeb",
    marginVertical: 5,
  },
});
