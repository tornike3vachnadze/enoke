import { View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { ToolbarToolsProps } from "./types";

export default function LineToolBar({
  boardData,
  selectedItemId,
  setBoardData,
}: ToolbarToolsProps) {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [showEnd, setShowEnd] = useState(false);
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    const id = boardData?.findIndex((item) => item.id === selectedItemId);
    console.log("id", id);
    setIndex(id);
    if (id && id != -1 && boardData) {
      console.log("sss", boardData[id].content?.style);
      setShowEnd(boardData[id].content?.style?.showEnd ?? false);
      setShowStart(boardData[id].content?.style?.showStart ?? false);
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
            title="End"
            active={showEnd}
            onPress={() => {
              // setHasCaption(!hasCaption);
              setShowEnd(!showEnd);
              toggleStyle("showEnd", !showEnd);
            }}
          >
            <Image source={require("../../assets/icons/caption.png")} />
          </Button.Square>

          <Button.Square
            title="Start"
            active={showStart}
            onPress={() => {
              setShowStart(!showStart);
              toggleStyle("showStart", !showStart);
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
    gap: 20,
    paddingVertical: 15,
  },
});
