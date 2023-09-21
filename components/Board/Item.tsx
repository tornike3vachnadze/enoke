import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BoardData } from "../../types";
// export interface IBoardItem {
//   id: string;
//   type: ItemTypes;
//   content: {
//     type: ItemContentType;
//     data: string | number | any;
//   };
//   initialPos: [number, number];
//   initialRot: number;
//   initialScale: number;
// }

// export type BoardData = IBoardItem[];

export default function BoardItem({
  index,
  initalPos,
  initialRotate,
  initialScale,
  onClick,
  isEditing,
  boardData,
  setBoardData,
  children,
}: {
  index: number;
  initalPos: [number, number];
  initialRotate: number;
  initialScale: number;
  onClick?: (() => void) | undefined;
  isEditing: boolean;
  boardData: BoardData;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  children: React.ReactNode;
}) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: initalPos[0], y: initalPos[1] });
  const rotate = useSharedValue(initialRotate);
  const scale = useSharedValue(initialScale);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        {
          scale: withSpring(isPressed.value ? scale.value * 1.05 : scale.value),
        },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const startOffset = useSharedValue({ x: initalPos[0], y: initalPos[1] });
  const startRotate = useSharedValue(initialRotate);
  const startScale = useSharedValue(initialScale);

  const updateData = () => {
    const newData = [...boardData];
    newData[index] = {
      ...newData[index],
      initialPos: [offset.value.x, offset.value.y],
      initialRot: rotate.value,
      initialScale: scale.value,
      isSelected: isPressed.value,
    };
    setBoardData(newData);
  };
  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const moveGesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      runOnJS(updateData)();
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + startOffset.value.x,
        y: e.translationY + startOffset.value.y,
      };
    })
    .onEnd(() => {
      startOffset.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
      runOnJS(updateData)();
    })
    .enabled(isEditing);

  const rotateGesture = Gesture.Rotation()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      rotate.value = e.rotation * 50 + startRotate.value;
    })
    .onEnd(() => {
      startRotate.value = rotate.value;
    })
    .onFinalize(() => {
      isPressed.value = false;
      runOnJS(updateData)();
    })
    .enabled(isEditing);

  const scaleGesture = Gesture.Pinch()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      scale.value = e.scale * startScale.value;
    })
    .onEnd(() => {
      startScale.value = scale.value;
    })
    .onFinalize(() => {
      isPressed.value = false;
      runOnJS(updateData)();
    })
    .enabled(isEditing);

  const gesture = Gesture.Simultaneous(
    moveGesture,
    Gesture.Race(rotateGesture, scaleGesture)
  );

  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[animatedStyles]}
        className="self-start w-0 h-0 relative"
        onTouchStart={() => onClick?.()}
      >
        <View
          className="absolute top-0 left-0 self-start w-auto h-auto"
          pointerEvents={"box-none"}
          // style={{
          //   transform: [
          //     { translateX: -contentSize.width / 2 },
          //     { translateY: -contentSize.height / 2 },
          //   ],
          // }}
          onLayout={(e) => {
            setContentSize({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            });
          }}
        >
          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
