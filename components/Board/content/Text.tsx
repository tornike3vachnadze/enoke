import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { BoardData, ItemStyle, TextStyleParams } from "../../../types";
import { TItemStyles } from "../../../utils/styles/text";

export default function TextContent({
  index,
  setBoardData,
  children,
  style,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  children: string;
  style: ItemStyle & TextStyleParams;
}) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(children);
  const [itemStyle, setItemStyle] = useState<TextStyleParams | TextStyle>({});
  const {
    color,
    backdrop,
    alignment,
    bold,
    bullet,
    italic,
    textStyle,
    underline,
    background,
  } = style;

  // const isSelected =

  useEffect(() => {
    setBoardData((prev) => {
      const newBoardData = [...prev];
      newBoardData[index].content.data = text;
      return newBoardData;
    });
  }, [text]);

  useEffect(() => {
    setItemStyle({
      ...textStyle,
      color,

      textDecorationColor: underline ? color : "transparent",
      fontWeight: bold ? "bold" : "normal",
      fontStyle: italic ? "italic" : "normal",
      textAlign: alignment,
    });
    return () => {};
  }, [style]);

  return (
    <Pressable className={``} onLongPress={() => setEditable(true)}>
      <View
        style={[
          styles.container,
          {
            shadowColor: backdrop,
            backgroundColor: background,
            // borderColor: isSelected ? "black" : "transparent",
          },
        ]}
      >
        {!editable ? (
          <Text style={[TItemStyles.general, itemStyle]} className={``}>
            {bullet ? `* ${text}` : text}
          </Text>
        ) : (
          <TextInput
            value={text}
            onChangeText={setText}
            autoFocus
            multiline
            onBlur={() => setEditable(false)}
            style={[TItemStyles.general, itemStyle]}
            className={`p-0 ${
              editable ? "border-2 border-design-primary" : ""
            }`}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    minHeight: 70,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderWidth: 1,
    borderColor: "transparent",
  },
});
