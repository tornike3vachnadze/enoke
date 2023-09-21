import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Button from "../Button";
import { BoardData, ItemTypes } from "../../types";
import StickerGroup from "../Board/group/StickerGroup";
import TextToolBar from "./TextToolBar";
import BoardToolBar from "./BoardToolBar";
import VideoToolBar from "./VideoToolBar";
import LineToolBar from "./LineToolBar";
import DrawingToolBar from "./DrawingToolBar";
import ListToolBar from "./ListToolBar";
import ColumnToolBar from "./ColumnToolBar";
import FileToolBar from "./FileToolBar";
import StickerToolBar from "./StickerToolBar";
import AudioToolBar from "./AudioToolBar";
import ImageToolBar from "./ImageToolBar";
import UrlToolBar from "./UrlToolBar";
import CameraToolBar from "./CameraToolBar";
import { ItemType } from "../Board";
import ToolbarTextButton from "./button/ToolbarTextButton";
import ToolbarImageButton from "./button/ToolbarImageButton";
import ToolbarVideoButton from "./button/ToolbarVideoButton";
import ToolbarCameraButton from "./button/ToolbarCameraButton";
import ToolbarAudioButton from "./button/ToolbarAudioButton";
import ToolbarListButton from "./button/ToolbarListButton";
import ToolbarColumnButton from "./button/ToolbarColumnButton";
import ToolbarStickerButton from "./button/ToolbarStickerButton";
import ToolbarFileButton from "./button/ToolbarFileButton";
import ToolbarLinkButton from "./button/ToolbarLinkButton";
import ToolbarLineButton from "./button/ToolbarLineButton";
import {
  Gesture,
  GestureDetector,
  GestureHandlerGestureEvent,
  GestureStateChangeEvent,
  ScrollView,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import VerticalScroll from "../Scrollbar/VerticalScroll";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import ToolbarDrawButton from "./button/ToolbarDrawButton";
import ToolbarButton from "./button/ToolbarButton";
import TextPlaceholder from "./placeholder/TextPlaceholder";
import MediaPlaceholder from "./placeholder/MediaPlaceholder";
import ListPlaceholder from "./placeholder/ListPlaceholder";
import AudioPlaceholder from "./placeholder/AudioPlaceholder";
import CameraPlaceholder from "./placeholder/CameraPlaceholder";
import ColumnPlaceholder from "./placeholder/ColumnPlaceholder";
import FilePlaceholder from "./placeholder/FilePlaceholder";

interface ToolbarProps {
  editMode: boolean;
  addMode: ItemType | null;
  setEditMode: (editMode: boolean) => void;
  setAddMode: (addMode: ItemType | null) => void;
  removeElementFromBoard: () => void;
  handleStickerChose: (data: any) => void;
  selectedItemId?: string;
  selectedItemType: ItemTypes | null;
  setSelectedItemType: (selectedItemType: ItemTypes | null) => void;
  boardData?: BoardData;
  setBoardData?: (data: BoardData) => void;
  overflow?: boolean;
  setOverflow?: (state: boolean) => void;
  onTapEmoji?: (
    e: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
}

const { width, height } = Dimensions.get("window");

const MainToolSetsWithSharingMode: React.FC<ToolbarProps> = ({
  editMode,
  addMode,
  setEditMode,
  setAddMode,
  removeElementFromBoard,
  handleStickerChose,
  selectedItemId,
  selectedItemType,
  setSelectedItemType,
  onTapEmoji,
}) => {
  const handleShowEmoji = (e: any) => {
    if (addMode?.type == "emoji") {
      setAddMode(null);
    } else {
      setAddMode({ type: "emoji", extra: e });
    }
  };
  const gesture = Gesture.Tap()
    .onBegin((e) => {})
    .onFinalize((e) => {
      console.log(e);
      runOnJS(handleShowEmoji)(e);
    });

  return (
    <View style={{ gap: 15 }}>
      <View>
        <GestureDetector gesture={gesture}>
          <Button.Round title="React">
            <Image source={require("../../assets/icons/smile.png")} />
          </Button.Round>
        </GestureDetector>
      </View>
      <View>
        <Button.Round title="Share">
          <Image source={require("../../assets/icons/share.png")} />
        </Button.Round>
      </View>
      <View>
        <Button.Round title="0">
          <Image source={require("../../assets/icons/chat.png")} />
        </Button.Round>
      </View>

      <View>
        <Button.Round onPress={() => setEditMode(!editMode)}>
          <Image source={require("../../assets/icons/plus.png")} />
        </Button.Round>
      </View>
    </View>
  );
};
const text = "Hold me to Start typing...";

const MainToolSetsWithEditMode: React.FC<ToolbarProps> = ({
  editMode,
  addMode,
  setEditMode,
  setAddMode,
  removeElementFromBoard,
  handleStickerChose,
  selectedItemId,
  selectedItemType,
  setSelectedItemType,
  boardData,
  setBoardData,
  overflow,
  setOverflow,
}) => {
  const isScrolling = useSharedValue(false);
  const contentSize = useSharedValue(0);
  const contentOffset = useSharedValue(0);
  const offset = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onMomentumBegin: (e, _) => {},
    onBeginDrag: (e, ctx) => {
      isScrolling.value = true;
      // contentSize.value = e.layoutMeasurement.height;
    },
    onScroll: (e, ctx) => {
      // contentOffset.value = e.contentOffset.y;
      // console.log("onScroll", e.contentOffset.y);
    },
    onEndDrag: (e, ctx) => {
      isScrolling.value = false;
    },
  });

  return (
    <Animated.ScrollView
      contentContainerStyle={[styles.scrollBarTool]}
      showsVerticalScrollIndicator={false}
      style={{ overflow: "visible" }}
      scrollEventThrottle={16}
      bounces={false}
      onScroll={onScroll}
    >
      <ToolbarButton
        key={"text"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "text", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<TextPlaceholder text={text} />}
      >
        <Button.Square title="Text">
          <Image source={require("../../assets/icons/text.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"image"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "image", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<MediaPlaceholder />}
      >
        <Button.Square title="Image">
          <Image source={require("../../assets/icons/image.png")} />
        </Button.Square>
      </ToolbarButton>

      <ToolbarButton
        key={"video"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "video", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<MediaPlaceholder />}
      >
        <Button.Square title="Video">
          <Image source={require("../../assets/icons/image.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"camera"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "camera", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<CameraPlaceholder />}
      >
        <Button.Square title="Camera">
          <Image source={require("../../assets/icons/camera.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"audio"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "audio", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<AudioPlaceholder />}
      >
        <Button.Square title="Voice">
          <Image source={require("../../assets/icons/voice.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"list"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "list", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<ListPlaceholder />}
      >
        <Button.Square title="List">
          <Image source={require("../../assets/icons/list.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"column"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "column", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<ColumnPlaceholder />}
      >
        <Button.Square title="Column">
          <Image source={require("../../assets/icons/column.png")} />
        </Button.Square>
      </ToolbarButton>

      <ToolbarStickerButton
        key={"sticker"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        onPressButton={(e) => {
          const { absoluteX, absoluteY, x, y } = e;

          if (addMode?.type == "showSticker") {
            setAddMode(null);
          } else {
            setAddMode({
              type: "showSticker",
              extra: {
                x: absoluteX - x,
                y: absoluteY - y,
              },
            });
          }
        }}
      />

      <ToolbarButton
        key={"link"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "url", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<CameraPlaceholder />}
      >
        <Button.Square title="Link">
          <Image source={require("../../assets/icons/camera.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarButton
        key={"file"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onDrop={(e) => {
          setAddMode({ type: "file", target: e });
        }}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        draggableComponent={<FilePlaceholder />}
      >
        <Button.Square title="File">
          <Image source={require("../../assets/icons/file-upload.png")} />
        </Button.Square>
      </ToolbarButton>
      <ToolbarLineButton
        key={"line"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onTouchDown={() => {
          setOverflow?.(true);
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        onDrop={(e) => {
          setAddMode({ type: "line", target: e });
        }}
      />

      <ToolbarDrawButton
        key={isScrolling.value ? "draw" : "re-draw"}
        scrollHeight={contentSize.value}
        scrollOffset={contentOffset}
        enabled={!isScrolling.value}
        onPress={() => {
          addMode?.type === "drawing"
            ? setAddMode(null)
            : setAddMode({ type: "drawing" });
        }}
        onTouchUp={() => {
          setOverflow?.(false);
        }}
        active={addMode?.type === "drawing"}
      />
      {/* <View>
        <Button.Square
          title="Board"
          onPress={() =>
            addMode === "board" ? setAddMode(null) : setAddMode("board")
          }
          active={addMode === "board"}
        >
          <Image source={require("../../assets/icons/file-upload.png")} />
        </Button.Square>
      </View> */}
    </Animated.ScrollView>
  );
};

const CustomToolbar: React.FC<ToolbarProps> = ({
  editMode,
  addMode,
  setEditMode,
  setAddMode,
  removeElementFromBoard,
  handleStickerChose,
  selectedItemId,
  selectedItemType,
  setSelectedItemType,
  boardData,
  setBoardData,
  overflow,
  setOverflow,
  onTapEmoji,
}) => {
  if (editMode) {
    switch (selectedItemType) {
      case "text":
        return (
          <TextToolBar
            boardData={boardData}
            setBoardData={setBoardData}
            selectedItemId={selectedItemId}
          />
        );
      case "image":
        return <ImageToolBar />;
      case "audio":
        return (
          <AudioToolBar
            boardData={boardData}
            setBoardData={setBoardData}
            selectedItemId={selectedItemId}
          />
        );
      case "camera":
        return <CameraToolBar />;
      case "video":
        return <VideoToolBar />;
      case "url":
        return (
          <UrlToolBar
            boardData={boardData}
            setBoardData={setBoardData}
            selectedItemId={selectedItemId}
          />
        );
      case "line":
        return (
          <LineToolBar
            boardData={boardData}
            setBoardData={setBoardData}
            selectedItemId={selectedItemId}
          />
        );
      case "sticker":
        return <StickerToolBar />;
      case "drawing":
        return <DrawingToolBar />;
      case "list":
        return (
          <ListToolBar
            boardData={boardData}
            setBoardData={setBoardData}
            selectedItemId={selectedItemId}
          />
        );
      case "column":
        return <ColumnToolBar />;
      case "file":
        return <FileToolBar />;
      case "board":
        return <BoardToolBar />;
      default:
        return !editMode ? (
          <MainToolSetsWithSharingMode
            editMode={editMode}
            addMode={addMode}
            setEditMode={setEditMode}
            setAddMode={setAddMode}
            removeElementFromBoard={removeElementFromBoard}
            handleStickerChose={handleStickerChose}
            selectedItemId={selectedItemId}
            selectedItemType={selectedItemType}
            setSelectedItemType={setSelectedItemType}
            onTapEmoji={onTapEmoji}
          />
        ) : (
          <MainToolSetsWithEditMode
            editMode={editMode}
            addMode={addMode}
            setEditMode={setEditMode}
            setAddMode={setAddMode}
            removeElementFromBoard={removeElementFromBoard}
            handleStickerChose={handleStickerChose}
            selectedItemId={selectedItemId}
            selectedItemType={selectedItemType}
            setSelectedItemType={setSelectedItemType}
            boardData={boardData}
            setBoardData={setBoardData}
            overflow={overflow}
            setOverflow={setOverflow}
          />
        );
    }
  } else {
    return (
      <MainToolSetsWithSharingMode
        editMode={editMode}
        addMode={addMode}
        setEditMode={setEditMode}
        setAddMode={setAddMode}
        removeElementFromBoard={removeElementFromBoard}
        handleStickerChose={handleStickerChose}
        selectedItemId={selectedItemId}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
        onTapEmoji={onTapEmoji}
      />
    );
  }
};

const Toolbar: React.FC<ToolbarProps> = ({
  editMode,
  addMode,
  setEditMode,
  setAddMode,
  removeElementFromBoard,
  handleStickerChose,
  selectedItemId,
  selectedItemType,
  setSelectedItemType,
  boardData,
  setBoardData,
  onTapEmoji,
}) => {
  const [overflow, setOverflow] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.toolbar,

        {
          backgroundColor: editMode ? "#F7F7FA" : "transparent", //#F7F7FA
          overflow: overflow ? "visible" : "hidden",
        },
      ]}
    >
      <CustomToolbar
        editMode={editMode}
        addMode={addMode}
        setEditMode={setEditMode}
        setAddMode={setAddMode}
        removeElementFromBoard={removeElementFromBoard}
        handleStickerChose={handleStickerChose}
        selectedItemId={selectedItemId}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
        boardData={boardData}
        setBoardData={setBoardData}
        overflow={overflow}
        setOverflow={setOverflow}
        onTapEmoji={onTapEmoji}
      />

      {editMode && (
        <View
          style={{
            backgroundColor: editMode ? "#F7F7FA" : "transparent", //#F7F7FA
            paddingBottom: 10,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View className="">
            <Button.Transparent
              onPress={() => {
                removeElementFromBoard();
                setSelectedItemType(null);
              }}
            >
              <Image source={require("../../assets/icons/bin.png")} />
            </Button.Transparent>
          </View>
          <View className="">
            <Button.Round
              onPress={() => {
                setEditMode(!editMode);
                setAddMode(null);
                setSelectedItemType(null);
              }}
            >
              <Image source={require("../../assets/icons/minus.png")} />
            </Button.Round>
          </View>
        </View>
      )}
    </View>
  );
};
/* 
 paddingTop: 10,
    paddingBottom: 0,
    width: 50,
    height: height * 0.7,
    position: "absolute",
    right: 20,
    bottom: 20,
    overflow: "hidden",
    borderRadius: 30,
    justifyContent: "flex-end",
    zIndex: 10000,
*/

const styles = StyleSheet.create({
  toolbar: {
    paddingTop: 10,
    paddingBottom: 0,
    width: 50,
    height: height * 0.7,
    position: "absolute",
    right: 20,
    bottom: 20,
    overflow: "visible",
    borderRadius: 30,
    justifyContent: "flex-end",
    zIndex: 10000,
  },
  scrollBarTool: {
    flexGrow: 1,
    gap: 15,
    justifyContent: "flex-end",
  },
  customToolbar: {
    position: "absolute",
    top: 10,
    left: 70,
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    padding: 10,
  },
});

export default Toolbar;
