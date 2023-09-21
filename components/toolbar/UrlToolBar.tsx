import { View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { ToolbarToolsProps } from "./types";

export default function UrlToolBar({
  boardData,
  selectedItemId,
  setBoardData,
}: ToolbarToolsProps) {
  const [hasCaption, setHasCaption] = useState(false);
  const [hasPreview, setHasPreview] = useState(false);
  const [index, setIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const id = boardData?.findIndex((item) => item.id === selectedItemId);
    console.log("id", id);
    setIndex(id);
    if (id && id != -1 && boardData) {
      setHasCaption(boardData[id].content?.style?.caption ?? false);
      setHasPreview(boardData[id].content?.style?.preview ?? false);
    }

    return () => {
      setIndex(undefined);
    };
  }, [selectedItemId]);

  const toggleStyle = (key: string, value: boolean) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, [key]: value };
    setBoardData?.(newBoardData);
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Button.Square
            title="Caption"
            active={hasCaption}
            onPress={() => {
              setHasCaption(!hasCaption);
              toggleStyle("caption", !hasCaption);
            }}
          >
            <Image source={require("../../assets/icons/caption.png")} />
          </Button.Square>
        </View>
        <View>
          <Button.Square
            title="Preview"
            active={hasPreview}
            onPress={() => {
              setHasPreview(!hasPreview);
              toggleStyle("preview", !hasPreview);
            }}
          >
            <Image source={require("../../assets/icons/image-upload.png")} />
          </Button.Square>
        </View>
      </ScrollView>
      <View>
        <Button.Square title="Copy">
          <Image source={require("../../assets/icons/copy.png")} />
        </Button.Square>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 15,
    paddingVertical: 15,
  },
});
