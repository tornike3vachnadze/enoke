import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
} from "react-native-reanimated";
import StickerItem from "./StickerItem";
import {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
interface Sticker {
  name: string;
  uri: any;
}

interface Pack {
  name: string;
  uri: any;
}
type DropPointType = GestureStateChangeEvent<PanGestureHandlerEventPayload> & {
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
};
const stickerList: Sticker[] = [
  { name: "flame", uri: require("../../../assets/groups/stickers/Flame.png") },
  {
    name: "flame",
    uri: require("../../../assets/groups/stickers/Champagne.png"),
  },
  { name: "flame", uri: require("../../../assets/groups/stickers/Clock.png") },
  {
    name: "flame",
    uri: require("../../../assets/groups/stickers/Diamond.png"),
  },
  {
    name: "flame",
    uri: require("../../../assets/groups/stickers/Fortune_Teller_Ball.png"),
  },
  { name: "flame", uri: require("../../../assets/groups/stickers/Gift.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Heart.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/House.png") },
  {
    name: "flame",
    uri: require("../../../assets/groups/stickers/Lightning.png"),
  },
  { name: "flame", uri: require("../../../assets/groups/stickers/Moon.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Pixel.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Rocket.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Star.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Sun.png") },
  { name: "flame", uri: require("../../../assets/groups/stickers/Trophy.png") },
];

const packList: Pack[] = [
  {
    name: "arrow",
    uri: require("../../../assets/groups/stickers/packs/arrow.png"),
  },
  {
    name: "flame",
    uri: require("../../../assets/groups/stickers/packs/flame.png"),
  },
  {
    name: "highlight",
    uri: require("../../../assets/groups/stickers/packs/highlight.png"),
  },
  {
    name: "lady",
    uri: require("../../../assets/groups/stickers/packs/lady.png"),
  },
  {
    name: "smile_marker",
    uri: require("../../../assets/groups/stickers/packs/smile_marker.png"),
  },
];

interface StickerGroupProps {
  onStickerChoose: (data: ImageSourcePropType, e: DropPointType) => void;
  position: { x: number; y: number };
}

const BOX_SIZE = {
  width: 228,
  height: 250,
};
const OFFSET = {
  width: 25,
  height: 25,
};

const StickerGroup: React.FC<StickerGroupProps> = ({
  onStickerChoose,
  position,
}) => {
  const [selectedPack, setSelectedPack] = useState<number>(0);
  const inset = useSafeAreaInsets();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   { translateX: position.x - BOX_SIZE.width },
      //   { translateY: position.y },
      // ],
      left: position.x - BOX_SIZE.width - OFFSET.width,
      top: position.y - BOX_SIZE.height - OFFSET.height,
    };
  });
  return (
    <Animated.View
      entering={FadeIn.springify(100)}
      exiting={FadeOut.duration(30)}
      style={[styles.container, animatedStyle]}
    >
      <View style={styles.group}>
        {/* main title */}
        <View style={styles.title}>
          <Text
            className={`font-bold font-satoshi-bold text-sm text-design-dark`}
          >
            Choose a sticker
          </Text>
        </View>

        <View style={styles.allPacks}>
          <Text
            className={`font-bold font-satoshi-medium text-xs text-design-dark`}
          >
            All Packs
          </Text>
          <ScrollView
            contentContainerStyle={styles.packStickers}
            horizontal={true}
            style={{ overflow: "visible" }}
          >
            {packList.map((pack, index) => {
              return (
                <View key={index}>
                  <Pressable onPress={() => setSelectedPack(index)}>
                    <View
                      style={[
                        styles.packSticker,
                        {
                          borderBottomColor: "#727272",
                          borderBottomWidth: index === selectedPack ? 1 : 0,
                        },
                      ]}
                    >
                      <Image
                        source={pack.uri}
                        style={{ resizeMode: "stretch" }}
                      />
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* the actual stickers for the selected group */}
        <View style={styles.classic}>
          <Text
            className={`font-bold font-satoshi-medium text-xs text-design-dark`}
          >
            Classic
          </Text>
          <ScrollView
            contentContainerStyle={styles.stickers}
            style={{ overflow: "visible" }}
          >
            {stickerList.map((sticker, index) => {
              return (
                <StickerItem
                  sticker={sticker}
                  index={index}
                  onDrop={(e, sticker) => onStickerChoose(sticker, e)}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.triangle} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    // right: 60,
    // bottom: -20,
    overflow: "visible",
    zIndex: 20000,
  },

  group: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: BOX_SIZE.width,
    height: BOX_SIZE.height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,
    elevation: 24,
  },

  title: {},

  mainTitle: {
    color: "black",
  },

  allPacks: {
    //backgroundColor: "red",
    paddingVertical: 5,
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopColor: "#E3E3E3",
    borderTopWidth: 2,
  },

  packStickers: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "white",
    flex: 1,
  },

  packSticker: {
    marginTop: 5,
    width: 26,
    height: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  classic: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  stickers: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },

  triangle: {
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderLeftWidth: 20,
    borderBottomWidth: 10,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "white",
    borderBottomRightRadius: 25,
    bottom: 45,
    right: -20,
  },
});

export default StickerGroup;
