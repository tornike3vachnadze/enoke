import { View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { ToolbarToolsProps } from "./types";

export default function ListToolBar({
  boardData,
  selectedItemId,
  setBoardData,
}: ToolbarToolsProps) {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [hasCaption, setHasCaption] = useState(false);

  useEffect(() => {
    const id = boardData?.findIndex((item) => item.id === selectedItemId);
    console.log("id", id);
    setIndex(id);
    if (id && id != -1 && boardData) {
      console.log("sss", boardData[id].content?.style);
      setHasCaption(boardData[id].content?.style?.showCaption ?? false);
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
            title="Title"
            active={hasCaption}
            onPress={() => {
              setHasCaption(!hasCaption);
              toggleStyle("showCaption", !hasCaption);
            }}
          >
            <Image source={require("../../assets/icons/caption.png")} />
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
