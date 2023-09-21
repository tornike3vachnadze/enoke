import { View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { ToolbarToolsProps } from "./types";
import TColorPicker from "./tools/text/TColorPicker";
import {
  BoardData,
  IBoardItem,
  ItemTypes,
  TAlignment,
  TStyle,
} from "../../types";
import TBackdropColorPicker from "./tools/text/TBackdropColorPicker";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import TStylePicker from "./tools/text/TStylePicker";
import { TItemStyles } from "../../utils/styles/text";
import TAlignmentPicker from "./tools/text/TAlignmentPicker";
import { TextStyleParams } from "../../types";
type TextToolType =
  | "color"
  | "backdrop"
  | "bullet"
  | "bold"
  | "italic"
  | "underline"
  | "alignment"
  | "textStyle";

export default function TextToolBar({
  boardData,
  selectedItemId,
  setBoardData,
}: ToolbarToolsProps) {
  const [isScrollable, setIsScrollable] = useState<boolean>(true);
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);
  const [showItem, setShowItem] = useState<{ type: TextToolType } | null>(null);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [isBold, setIsBold] = useState(false);
  const [hasUnderline, setHasUnderline] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [hasBullet, setHasBullet] = useState(false);
  const [position, setPosition] = useState<
    GestureStateChangeEvent<TapGestureHandlerEventPayload> | undefined
  >(undefined);

  useEffect(() => {
    const id = boardData?.findIndex((item) => item.id === selectedItemId);
    console.log("id", id);
    setIndex(id);
    if (id && id != -1 && boardData) {
      setIsBold(boardData[id].content?.style?.bold ?? false);
      setIsItalic(boardData[id].content?.style?.italic ?? false);
      setHasUnderline(boardData[id].content?.style?.underline ?? false);
      setHasBullet(boardData[id].content?.style?.bullet ?? false);
    }

    return () => {
      setIndex(undefined);
    };
  }, [selectedItemId]);

  const openColorPicker = () => {
    setIsScrollable(!isScrollable);

    if (showItem?.type == "color") {
      setIsScrollable(true);

      setShowItem(null);
      return null;
    }
    setIsScrollable(false);

    setShowItem({ type: "color" });
  };
  const openBackdropColorPicker = () => {
    if (showItem?.type == "backdrop") {
      setIsScrollable(true);

      setShowItem(null);
      return null;
    }
    setIsScrollable(false);

    setShowItem({ type: "backdrop" });
  };
  const openAlignment = () => {
    if (showItem?.type == "alignment") {
      setIsScrollable(true);

      setShowItem(null);
      return null;
    }
    setIsScrollable(false);

    setShowItem({ type: "alignment" });
  };

  const handleChangeColor = (color: string) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle) newBoardData[index].content.style = { ...oldStyle, color };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const handleChangeBgColor = (color: string) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, background: color };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const handleChangeBackdropColor = (color: string) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, backdrop: color };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const toggleStyle = (key: string, value: boolean) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, [key]: value };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const changeStyle = (style: TStyle) => {
    if (!index) return null;
    if (!boardData) return null;
    let tstyle;
    switch (style) {
      case TStyle.LargeHeading:
        tstyle = TItemStyles.largeHeading;
        toggleStyle("bold", true);
        toggleStyle("italic", false);
        setIsBold(true);
        setIsItalic(false);
        break;
      case TStyle.NormalHeading:
        tstyle = TItemStyles.normalHeading;
        toggleStyle("bold", true);
        toggleStyle("italic", false);
        setIsBold(true);
        setIsItalic(false);
        break;
      case TStyle.Normal:
        tstyle = TItemStyles.normal;
        toggleStyle("bold", false);
        toggleStyle("italic", false);
        setIsBold(false);
        setIsItalic(false);
        break;
      case TStyle.Small:
        tstyle = TItemStyles.small;
        toggleStyle("bold", false);
        toggleStyle("italic", false);
        setIsBold(false);
        setIsItalic(false);

        break;
      case TStyle.Qoute:
        tstyle = TItemStyles.qoute;
        toggleStyle("italic", true);
        toggleStyle("bold", false);
        setIsBold(false);
        setIsItalic(true);
        break;
      default:
        tstyle = TItemStyles.normal;
        break;
    }

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, textStyle: tstyle };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const changeAlignment = (data: TAlignment) => {
    if (!index) return null;
    if (!boardData) return null;

    const newBoardData = [...boardData];
    const oldStyle = newBoardData[index].content.style;
    if (oldStyle)
      newBoardData[index].content.style = { ...oldStyle, alignment: data };
    setBoardData?.(newBoardData);
    setShowItem(null);
    setIsScrollable(true);
  };
  const gesture = Gesture.Tap().onFinalize((e) => {
    runOnJS(setPosition)(e);
    // runOnJS(setShowItem)({ type: "color" });
  });
  const gestureBackdrop = Gesture.Tap().onFinalize((e) => {
    runOnJS(setPosition)(e);
    // runOnJS(setShowItem)({ type: "backdrop" });
  });
  const gestureStyle = Gesture.Tap().onFinalize((e) => {
    runOnJS(setPosition)(e);
    // runOnJS(setShowItem)({ type: "textStyle" });
  });
  const gestureAlign = Gesture.Tap().onFinalize((e) => {
    runOnJS(setPosition)(e);
    // runOnJS(setShowItem)({ type: "textStyle" });
  });
  const openTextStyle = () => {
    if (showItem?.type == "textStyle") {
      setIsScrollable(true);

      setShowItem(null);
      return null;
    }
    setIsScrollable(false);

    setShowItem({ type: "textStyle" });
  };

  if (!index) return null;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      scrollEnabled={isScrollable}
    >
      <View>
        <GestureDetector gesture={gesture} key={"1"}>
          <Button.Square
            title="Text"
            titleStyle={styles.title}
            active={showItem?.type === "color"}
            onPress={openColorPicker}
          >
            <Image source={require("../../assets/icons/color.png")} />
          </Button.Square>
        </GestureDetector>
        {showItem?.type == "color" && position && (
          <TColorPicker
            key={"color"}
            onSelect={(data) => handleChangeColor(data.color)}
            onSelectBG={(data) => handleChangeBgColor(data.color)}
            item={boardData?.[index]}
            position={{
              x: position?.absoluteX - position?.x,
              y: position?.absoluteY - position?.y,
            }}
          />
        )}
      </View>
      <View>
        <GestureDetector gesture={gestureBackdrop} key={"2"}>
          <Button.Square
            title="Backdrop"
            titleStyle={styles.title}
            onPress={openBackdropColorPicker}
            active={showItem?.type === "backdrop"}
          >
            <Image source={require("../../assets/icons/border.png")} />
          </Button.Square>
        </GestureDetector>
        {showItem?.type == "backdrop" && position && (
          <TBackdropColorPicker
            key={"backdrop"}
            onSelect={(data) => handleChangeBackdropColor(data.color)}
            item={boardData?.[index]}
            position={{
              x: position?.absoluteX - position?.x,
              y: position?.absoluteY - position?.y,
            }}
          />
        )}
      </View>
      <View>
        <Button.Square
          title="Bullet"
          titleStyle={styles.title}
          onPress={() => {
            toggleStyle("bullet", !hasBullet);
            setHasBullet(!hasBullet);
          }}
          active={hasBullet}
        >
          <Image source={require("../../assets/icons/bullet.png")} />
        </Button.Square>
      </View>
      <View>
        <Button.Square
          title="Bold"
          titleStyle={styles.title}
          onPress={() => {
            toggleStyle("bold", !isBold);
            setIsBold(!isBold);
          }}
          active={isBold}
        >
          <Image source={require("../../assets/icons/text-bold.png")} />
        </Button.Square>
      </View>
      <View>
        <Button.Square
          title="Italic"
          titleStyle={styles.title}
          onPress={() => {
            toggleStyle("italic", !isItalic);
            setIsItalic(!isItalic);
          }}
          active={isItalic}
        >
          <Image source={require("../../assets/icons/text-italic.png")} />
        </Button.Square>
      </View>
      <View>
        <Button.Square
          title="Underline"
          titleStyle={styles.title}
          onPress={() => {
            toggleStyle("underline", !hasUnderline);
            setHasUnderline(!hasUnderline);
          }}
          active={hasUnderline}
        >
          <Image source={require("../../assets/icons/text-underline.png")} />
        </Button.Square>
      </View>
      <View>
        <GestureDetector gesture={gestureAlign}>
          <Button.Square
            title="Alignment"
            titleStyle={styles.title}
            onPress={openAlignment}
            active={showItem?.type === "alignment"}
          >
            <Image source={require("../../assets/icons/alignment.png")} />
          </Button.Square>
        </GestureDetector>
        {showItem?.type == "alignment" && position && (
          <TAlignmentPicker
            onSelect={(data) => changeAlignment(data)}
            item={boardData?.[index]}
            position={{
              x: position?.absoluteX - position?.x,
              y: position?.absoluteY - position?.y,
            }}
          />
        )}
      </View>
      <View>
        <GestureDetector gesture={gestureStyle}>
          <Button.Square
            title="Text Style"
            titleStyle={styles.title}
            onPress={openTextStyle}
            active={showItem?.type === "textStyle"}
          >
            <Image source={require("../../assets/icons/text-style.png")} />
          </Button.Square>
        </GestureDetector>
        {showItem?.type == "textStyle" && position && (
          <TStylePicker
            onSelect={(data) => changeStyle(data)}
            item={boardData?.[index]}
            position={{
              x: position?.absoluteX - position?.x,
              y: position?.absoluteY - position?.y,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 10,
  },
});
