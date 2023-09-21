import { useRef, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { BoardData } from "../../../types";
import Svg, { Path } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle } from "react-native-reanimated";
import { Text } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function DrawingContent({
  index,
  initialPath,
  setBoardData,
  initialPos,
}: {
  index: number;
  initialPath?: string;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  initialPos: { x: number; y: number };
}) {
  const [path, setPath] = useState<string>(initialPath || "");

  const [canDraw, setCanDraw] = useState<boolean>(true);

  const pathRef = useRef<Path>(null);

  const updateData = () => {
    setBoardData((prev) => {
      const newBoardData = [...prev];
      newBoardData[index].content.data = path;
      return newBoardData;
    });
  };

  const gesture = Gesture.Pan()
    .enabled(canDraw)
    .onBegin((e) => {
      const { x, y } = e;
      const startX = x;
      const startY = y;
      const initialPath = `M${startX},${startY}`;
      runOnJS(setPath)(initialPath);
      console.log("onBeginDrawing", e);
    })
    .onUpdate((e) => {
      const { translationX, translationY } = e;
      const moveX = translationX;
      const moveY = translationY;

      const newPath = `${path} Q${moveX},${moveY} ${moveX},${moveY}`;
      runOnJS(setPath)(newPath);
      console.log("onUpdateDrawing", e);
    })
    .onEnd((e) => {})
    .onFinalize((e) => {
      runOnJS(setCanDraw)(false);
      runOnJS(updateData)();
    });
  const animatedPlaceholder = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: initialPos.x }, { translateY: initialPos.y }],
      top: initialPos.y,
      left: initialPos.x,
    };
  });
  return (
    <View pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ position: "absolute" }, animatedPlaceholder]}>
          <View
            className="border-design-primary"
            style={
              canDraw
                ? styles.canDrawContainer
                : [
                    styles.pathContainer,
                    {
                      width: pathRef?.current?.getBBox()?.width,
                      height: pathRef?.current?.getBBox()?.height,
                    },
                  ]
            }
            pointerEvents="box-none"
          >
            {canDraw && (
              <Animated.View style={[{ position: "absolute" }]}>
                <Text className="font-bold font-satoshi-bold text-lg text-design-primary/20">
                  Drawing here
                </Text>
              </Animated.View>
            )}
            <Svg width="100%" height="100%" style={styles.svg}>
              <Path
                d={path}
                stroke="#6C68A8"
                strokeWidth="2"
                fill="none"
                ref={pathRef}
              />
            </Svg>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canDrawContainer: {
    alignSelf: "center",
    width: 300,
    height: 300,
    // backgroundColor: "transparent",
    position: "absolute",

    transform: [{ translateX: -150 }, { translateY: -150 }],
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  pathContainer: {
    // position: "absolute",
    // left: 0,
    // top: 0,
    // bottom: 0,
    // right: 0,
    transform: [{ translateX: -150 }, { translateY: -150 }],
    backgroundColor: "transparent",
  },
  svg: {
    backgroundColor: "transparent",
  },
});
