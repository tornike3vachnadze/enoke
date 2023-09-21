import { useEffect, useState } from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { BoardData } from "../../../types";
import { Video, ResizeMode } from "expo-av";
import { BACKEND_URL } from "../../../config";

export default function VideoContent({
  index,
  setBoardData,
  url,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  url: {
    type: "video";
    data: string;
  };
}) {
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    // setBoardData((prev) => {
    //   const newBoardData = [...prev];
    //   newBoardData[index].content = "Pending impl";
    //   return newBoardData;
    // });
  }, []);

  return (
    <Pressable className={``}>
      {url.type === "video" && (
        <>
          {isLoading && (
            <View
              className="border border-design-primary rounded-xl p-4 flex justify-center items-center"
              style={{
                width: videoSize.width,
                height: videoSize.height,
              }}
            >
              <ActivityIndicator />
              <Text className="text-design-primary text-xs font-normal font-satoshi-regular mt-2">
                Loading...
              </Text>
            </View>
          )}
          {hasError && (
            <Text className="text-design-primary text-xs font-normal font-satoshi-regular mb-1">
              Error Loading Image
            </Text>
          )}

          <Video
            source={{
              uri: url.data.startsWith("http")
                ? url.data
                : `${BACKEND_URL}/static${url.data}`,
            }}
            style={{
              width: videoSize.width,
              height: videoSize.height,
              borderRadius: 16,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onReadyForDisplay={(e) => {
              if (e.naturalSize.width > 500 || e.naturalSize.height > 500) {
                const aspectRatio = e.naturalSize.width / e.naturalSize.height;
                if (aspectRatio > 1) {
                  setVideoSize({
                    width: 500,
                    height: 500 / aspectRatio,
                  });
                }
                if (aspectRatio < 1) {
                  setVideoSize({
                    width: 500 * aspectRatio,
                    height: 500,
                  });
                }
              } else {
                setVideoSize({
                  width: e.naturalSize.width,
                  height: e.naturalSize.height,
                });
              }
              setIsLoading(false);
            }}
            onError={(e) => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </>
      )}
    </Pressable>
  );
}
