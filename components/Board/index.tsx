import {
  View,
  Image,
  Keyboard,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureEvent,
  PanGesture,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { memo, useEffect, useMemo, useState } from "react";
import {
  BoardData,
  IBoardItem,
  ItemTypes,
  TAlignment,
  TStyle,
} from "../../types";
import BoardItem from "./Item";
import TextContent from "./content/Text";
import ImageContent from "./content/Image";
import { useMedia } from "../../hooks";
import VideoContent from "./content/Video";
import AudioContent from "./content/Audio";
import UrlContent from "./content/URL";
import StickerGroup from "./group/StickerGroup";
import StickerContent from "./content/Sticker";
import DrawingContent from "./content/Drawing";
import LineContent from "./content/Line";
import ListContent from "./content/List";
import ColumnContent from "./content/column/Column";
import FileContent from "./content/file/File";
import { G, Svg } from "react-native-svg";
import BoardContent from "./content/Board";
import Toolbar from "../toolbar/Toolbar";
import ProfileCard from "../ProfileCard";
import { useGlobalStore } from "../../store";
import { getArrayBufferForBlob } from "react-native-blob-jsi-helper";
import { useBoardServer } from "../../hooks/server/useBoardServer";
import EmojiSelector from "../Emoji/Emoji";
import { COLORS } from "../../utils/styles/color";
import { TItemStyles } from "../../utils/styles/text";

const RANGE = 1500;
const INITIAL_SCALE = 1.03;
const { width, height } = Dimensions.get("window");
export type ItemType = {
  type: ItemTypes;
  target?: GestureStateChangeEvent<PanGestureHandlerEventPayload>;
  extra?: any;
};
function BoardComponent({
  id,
  data,
  boardCoordinate,
}: {
  id: string;
  data: BoardData;
  boardCoordinate: { x: number; y: number } | null;
}) {
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);

  const { pickImage, takePhoto, pickVideo, pickDocument, uploadFile } =
    useMedia();

  const { updateBoard } = useBoardServer();

  const [boardData, setBoardData] = useState(data);

  const [editMode, setEditMode] = useState(false);

  const [addMode, setAddMode] = useState<ItemType | null>(null);

  const [selectedElementId, setSelectedElementId] = useState("");

  const [selectedItemType, setSelectedItemType] = useState<ItemTypes | null>(
    null
  );

  const [lastBoardLocation, setLastBoardLocation] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [composeMode, setComposeMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await updateBoard(id, boardData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [boardData]);

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const velocity = useSharedValue({ x: 0, y: 0 });

  const addTextToBoard = (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "text",
      content: {
        type: "text",
        data: "Hold me to Start typing...",
        style: {
          color: COLORS.primary,
          alignment: TAlignment.Center,
          backdrop: COLORS.none,
          bold: false,
          italic: false,
          underline: false,
          bullet: false,
          textStyle: TItemStyles.normal,
          background: "white",
        },
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const addLocalImageToBoard = async (e: any) => {
    setIsLoading(true);
    try {
      const image = await pickImage();
      console.log("image", image);
      if (image) {
        const blob = await fetch(image).then((r) => r.blob());
        const arrayBuffer = getArrayBufferForBlob(blob);
        const buffer = Buffer.from(arrayBuffer);
        const uploadRes = await uploadFile(
          buffer,
          `${image.split("/").pop()?.split(".")[0]}-${Date.now()}-${Math.floor(
            Math.random() * 99999
          )}.${blob.type.split("/")[1]}`,
          blob.type
        );

        if (uploadRes.success) {
          const item: IBoardItem = {
            id: `${Date.now()}`,
            type: "image",
            content: {
              type: "image",
              data: uploadRes.data?.url,
              style: null,
            },
            initialPos: [
              e.absoluteX -
                (boardCoordinate?.x ?? 0) -
                e.startX -
                startOffset.value.x,
              e.absoluteY -
                (boardCoordinate?.y ?? 0) -
                e.startY -
                startOffset.value.y,
            ],
            initialRot: 0,
            initialScale: INITIAL_SCALE,
            isSelected: false,
          };
          setBoardData((prev) => [...prev, item]);
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      }
    } catch (error) {
      console.log("select image", error);
      Alert.alert("Error", "Something went wrong");
    }
    setIsLoading(false);
  };

  const addCameraImageToBoard = async (e: any) => {
    setIsLoading(true);
    try {
      const image = await takePhoto();
      if (image) {
        const blob = await fetch(image).then((r) => r.blob());
        const arrayBuffer = getArrayBufferForBlob(blob);
        const buffer = Buffer.from(arrayBuffer);
        const uploadRes = await uploadFile(
          buffer,
          `${image.split("/").pop()?.split(".")[0]}-${Date.now()}-${Math.floor(
            Math.random() * 99999
          )}.${blob.type.split("/")[1]}`,
          blob.type
        );
        if (uploadRes.success) {
          const item: IBoardItem = {
            id: `${Date.now()}`,
            type: "image",
            content: {
              type: "image",
              data: uploadRes.data?.url,
              style: null,
            },
            initialPos: [
              e.absoluteX -
                (boardCoordinate?.x ?? 0) -
                e.startX -
                startOffset.value.x,
              e.absoluteY -
                (boardCoordinate?.y ?? 0) -
                e.startY -
                startOffset.value.y,
            ],
            initialRot: 0,
            initialScale: INITIAL_SCALE,
            isSelected: false,
          };
          setBoardData((prev) => [...prev, item]);
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
    setIsLoading(false);
  };

  const addLocalVideoToBoard = async (e: any) => {
    setIsLoading(true);
    try {
      const video = await pickVideo();
      if (video) {
        const blob = await fetch(video).then((r) => r.blob());
        const arrayBuffer = getArrayBufferForBlob(blob);
        const buffer = Buffer.from(arrayBuffer);
        const uploadRes = await uploadFile(
          buffer,
          `${video.split("/").pop()?.split(".")[0]}-${Date.now()}-${Math.floor(
            Math.random() * 99999
          )}.${blob.type.split("/")[1]}`,
          blob.type
        );
        if (uploadRes.success) {
          const item: IBoardItem = {
            id: `${Date.now()}`,
            type: "video",
            content: {
              type: "video",
              data: video,
              style: null,
            },
            initialPos: [
              e.absoluteX -
                (boardCoordinate?.x ?? 0) -
                e.startX -
                startOffset.value.x,
              e.absoluteY -
                (boardCoordinate?.y ?? 0) -
                e.startY -
                startOffset.value.y,
            ],
            initialRot: 0,
            initialScale: INITIAL_SCALE,
            isSelected: false,
          };
          setBoardData((prev) => [...prev, item]);
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
    setIsLoading(false);
  };

  const addAudioToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "audio",
      content: {
        type: "audio",
        data: null,
        style: {
          showCaption: false,
          caption: "",
        },
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const addUrlToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "url",
      content: {
        type: "url",
        data: null,
        style: {
          caption: true,
          preview: true,
        },
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const addListToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "list",
      content: {
        type: "list",
        data: null,
        style: {
          showCaption: false,
          caption: "",
        },
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const addColumnToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "column",
      content: {
        type: "column",
        data: null,
        style: null,
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const addStickerToBoard = async (e: any, data: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "sticker",
      content: {
        type: "sticker",
        data: data,
        style: null,
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: 1.1,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
    setAddMode(null);
  };

  const addFileToBoard = async (e: any) => {
    const file = await pickDocument();
    // console.log("fffff", file);
    const blob = await fetch(file.uri).then((r) => r.blob());
    const arrayBuffer = getArrayBufferForBlob(blob);
    const buffer = Buffer.from(arrayBuffer);
    const uploadRes = await uploadFile(
      buffer,
      `-${Date.now()}-${Math.floor(Math.random() * 99999)}.${
        blob.type.split("/")[1]
      }`,
      blob.type
    );

    console.log("fffff", uploadRes);
    if (file) {
      const item: IBoardItem = {
        id: `${Date.now()}`,
        type: "file",
        content: {
          type: "file",
          data: file,
          style: null,
        },
        initialPos: [
          e.absoluteX -
            (boardCoordinate?.x ?? 0) -
            e.startX -
            startOffset.value.x,
          e.absoluteY -
            (boardCoordinate?.y ?? 0) -
            e.startY -
            startOffset.value.y,
        ],
        initialRot: 0,
        initialScale: INITIAL_SCALE,
        isSelected: false,
      };
      setBoardData((prev) => [...prev, item]);
    }
  };

  const addBoardToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "board",
      content: {
        type: "board",
        data: null,
        style: null,
      },
      initialPos: [e.x, e.y],
      initialRot: 0,
      initialScale: 1,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };
  const addLineToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,
      type: "line",
      content: {
        type: "line",
        data: {
          left: {
            x: 0,
            y: 100,
          },
          center: {
            x: 0,
            y: 0,
          },
          right: {
            x: 100,
            y: 15,
          },
        },
        style: {
          showStart: true,
          showEnd: true,
        },
      },
      initialPos: [
        e.absoluteX -
          (boardCoordinate?.x ?? 0) -
          e.startX -
          startOffset.value.x,
        e.absoluteY -
          (boardCoordinate?.y ?? 0) -
          e.startY -
          startOffset.value.y,
      ],
      initialRot: 0,
      initialScale: INITIAL_SCALE,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };
  const addDrawingToBoard = async (e: any) => {
    const item: IBoardItem = {
      id: `${Date.now()}`,

      type: "drawing",
      content: {
        type: "drawing",
        data: "",
        style: null,
      },
      initialPos: [e.x, e.y],
      initialRot: 0,
      initialScale: 1,
      isSelected: false,
    };
    setBoardData((prev) => [...prev, item]);
  };

  const removeElementFromBoard = () => {
    setBoardData((prevData) =>
      prevData.filter((item) => item.id !== selectedElementId)
    );
  };

  const handleStickerChose = (data: any) => {
    addStickerToBoard(addMode?.target, data);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value.x, {
            velocity: 0,
            damping: 100,
          }),
        },
        {
          translateY: withSpring(offset.value.y, {
            velocity: 0,
            damping: 100,
          }),
        },
      ],
    };
  });

  const [lockedForDraw, setLockedForDraw] = useState<boolean>(false);

  const startOffset = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .enabled(true)
    .enableTrackpadTwoFingerGesture(true)
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: Math.min(
          Math.max(e.translationX + startOffset.value.x, -RANGE + width),
          0
        ),
        y: Math.min(
          Math.max(e.translationY + startOffset.value.y, -RANGE + height),
          0
        ),
      };
      velocity.value = {
        x: e.velocityX,
        y: e.velocityY,
      };
    })
    .onEnd(() => {
      startOffset.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      runOnJS(setSelectedItemType)(null);
    })
    .onFinalize((e) => {
      isPressed.value = false;

      runOnJS(setLastBoardLocation)({
        x: e.x,
        y: e.y,
      });
      if (addMode) {
        if (addMode.type === "drawing") {
          runOnJS(addDrawingToBoard)(e);
          runOnJS(setEditMode)(true);
          runOnJS(setLockedForDraw)(true);
        }

        if (addMode.type === "board") {
          runOnJS(addBoardToBoard)(e);
        }

        // runOnJS(setAddMode)(null);
        // console.log(addMode.type);
        // runOnJS(setAddMode)(null);
        runOnJS(setAddMode)(null);
      }
    });

  useEffect(() => {
    if (addMode) {
      if (addMode.type === "text") {
        addTextToBoard(addMode.target);
      }
      if (addMode.type === "image") {
        addLocalImageToBoard(addMode.target);
      }
      if (addMode.type === "camera") {
        addCameraImageToBoard(addMode.target);
      }
      if (addMode.type === "video") {
        addLocalVideoToBoard(addMode.target);
      }
      if (addMode.type === "audio") {
        addAudioToBoard(addMode.target);
      }
      if (addMode.type === "list") {
        addListToBoard(addMode.target);
      }
      if (addMode.type === "column") {
        addColumnToBoard(addMode.target);
      }
      if (addMode.type === "file") {
        addFileToBoard(addMode.target);
      }
      if (addMode.type === "url") {
        addUrlToBoard(addMode.target);
      }
      if (addMode.type === "sticker") {
        // handleStickerChose(addMode.target);
        addStickerToBoard(addMode?.target, addMode?.extra);
      }
      if (addMode.type === "line") {
        addLineToBoard(addMode.target);
      }
      // setAddMode(null);
      // console.log(addMode);
    }
  }, [addMode]);

  return (
    <>
      <Pressable onPressIn={Keyboard.dismiss}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[animatedStyles, { width: RANGE, height: RANGE }]}
            className="px-4 py-6"
          >
            {/* <Text style={{ position: "absolute", top: 50, left: 20 }}>
              {selectedElementId}-{selectedItemType}
            </Text> */}
            <ImageBackground
              source={require("../../assets/images/dotgrid.png")}
              style={{ width: "200%", height: "200%" }}
              resizeMode="cover"
              resizeMethod="resize"
            >
              {/* <Text>Add Mode : {addMode?.type ? addMode.type : "NULL"}</Text>
              <Text>Edit Mode : {editMode ? "True" : "False"}</Text>
              <Text>Lock for draw : {lockedForDraw ? "True" : "False"}</Text> */}
              <View>
                <Svg
                  width={500}
                  height={500}
                  viewBox="0 0 1000 1000"
                  style={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    transform: [
                      { scale: 3 },
                      { translateX: 150 },
                      { translateY: 150 },
                    ],
                    zIndex: 1000,
                  }}
                >
                  <G transform={`scale(${1})`}>
                    {useMemo(() => {
                      return boardData.map((item, index) => (
                        <G key={item.id}>
                          {item.type === "line" && (
                            <LineContent
                              editMode={editMode}
                              index={index}
                              boardData={boardData}
                              setBoardData={setBoardData}
                              style={item?.content?.style}
                              pos={{
                                x: item.initialPos[0],
                                y: item.initialPos[1],
                              }}
                              onClick={() => {
                                setSelectedElementId(item.id);
                                setSelectedItemType("line");
                                setEditMode(true);
                              }}
                              pathValues={{
                                left: {
                                  x: item.content.data.left.x || 0,
                                  y: item.content.data.left.y || 100,
                                },
                                center: {
                                  x: item.content.data.center.x || 0,
                                  y: item.content.data.center.y || 0,
                                },
                                right: {
                                  x: item.content.data.right.x || 100,
                                  y: item.content.data.right.y || 15,
                                },
                              }}
                            ></LineContent>
                          )}
                        </G>
                      ));
                    }, [boardData])}
                  </G>
                </Svg>
                {boardData.map((item, index) => (
                  <BoardItem
                    index={index}
                    initalPos={item.initialPos}
                    initialRotate={item.initialRot}
                    initialScale={item.initialScale}
                    onClick={() => {
                      setSelectedElementId(item.id);
                      setSelectedItemType(item.type);
                    }}
                    isEditing={editMode}
                    key={item.id}
                    boardData={boardData}
                    setBoardData={setBoardData}
                  >
                    {item.type === "text" && (
                      <TextContent
                        index={index}
                        setBoardData={setBoardData}
                        style={item?.content?.style}
                      >
                        {item.content.data}
                      </TextContent>
                    )}
                    {item.type === "image" && (
                      <ImageContent
                        index={index}
                        setBoardData={setBoardData}
                        url={item.content as any}
                      ></ImageContent>
                    )}
                    {item.type === "video" && (
                      <VideoContent
                        index={index}
                        setBoardData={setBoardData}
                        url={item.content as any}
                      ></VideoContent>
                    )}
                    {item.type === "audio" && (
                      <AudioContent
                        index={index}
                        setBoardData={setBoardData}
                        url={item.content as any}
                        style={item?.content?.style}
                      ></AudioContent>
                    )}
                    {item.type === "url" && (
                      <UrlContent
                        index={index}
                        setBoardData={setBoardData}
                        url={item.content as any}
                        style={item?.content?.style}
                      ></UrlContent>
                    )}
                    {item.type === "sticker" && (
                      <StickerContent
                        index={index}
                        setBoardData={setBoardData}
                        uri={item.content.data}
                      ></StickerContent>
                    )}

                    {item.type === "drawing" && (
                      <DrawingContent
                        index={index}
                        initialPath={item.content.data}
                        setBoardData={setBoardData}
                        initialPos={{
                          x: item.initialPos[0],
                          y: item.initialPos[1],
                        }}
                      ></DrawingContent>
                    )}

                    {item.type === "list" && (
                      <ListContent
                        index={index}
                        setBoardData={setBoardData}
                        style={item?.content?.style}
                      ></ListContent>
                    )}
                    {item.type === "column" && (
                      <ColumnContent
                        index={index}
                        setBoardData={setBoardData}
                      ></ColumnContent>
                    )}
                    {item.type === "file" && (
                      <FileContent
                        index={index}
                        setBoardData={setBoardData}
                        data={item.content.data}
                      ></FileContent>
                    )}
                    {item.type === "board" && (
                      <BoardContent
                        index={index}
                        setBoardData={setBoardData}
                        data={item.content.data}
                      ></BoardContent>
                    )}
                    {item.type === "profile" && (
                      <ProfileCard
                        style={{
                          width: 350,
                        }}
                        username={item.content.data}
                      />
                    )}
                  </BoardItem>
                ))}
              </View>
            </ImageBackground>
          </Animated.View>
        </GestureDetector>
      </Pressable>
      {addMode?.type === "showSticker" && (
        <StickerGroup
          position={addMode.extra}
          onStickerChoose={(data, e) => {
            setAddMode({ type: "sticker", target: e, extra: data });
          }}
        />
      )}
      {addMode?.type === "emoji" && (
        <EmojiSelector
          onPressOutside={() => setAddMode(null)}
          key={"2"}
          position={{
            x: addMode.extra.absoluteX - addMode.extra.x,
            y: addMode.extra.absoluteY - addMode.extra.y,
          }}
        />
      )}
      <Toolbar
        editMode={editMode}
        addMode={addMode}
        setEditMode={setEditMode}
        setAddMode={setAddMode}
        removeElementFromBoard={removeElementFromBoard}
        handleStickerChose={handleStickerChose}
        selectedItemId={selectedElementId}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
        boardData={boardData}
        setBoardData={setBoardData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#F7F7FA",
    paddingVertical: 10,
    width: 50,
    height: height * 0.7,
    position: "absolute",
    right: 20,
    bottom: 20,
    overflow: "visible",
    borderRadius: 30,
  },
  scrollBarTool: {
    gap: 15,
    justifyContent: "flex-end",
  },
});

const Board = memo(BoardComponent);

export default Board;
