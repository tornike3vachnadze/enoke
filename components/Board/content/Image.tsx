import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { BoardData } from "../../../types";
import FastImage from "react-native-fast-image";
import { BACKEND_URL } from "../../../config";

export default function ImageContent({
  index,
  setBoardData,
  url,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  url: {
    type: "image" | "localimage";
    data: string;
  };
}) {
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 200, height: 112.5 });

  useEffect(() => {
    // setBoardData((prev) => {
    //   const newBoardData = [...prev];
    //   newBoardData[index].content = "Pending impl";
    //   return newBoardData;
    // });
  }, []);

  return (
    <Pressable className={``}>
      {url.type === "image" ? (
        <>
          {isLoading && (
            <View
              className="border border-design-primary rounded-xl p-4 flex justify-center items-center"
              style={{
                width: imageSize.width,
                height: imageSize.height,
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

          <FastImage
            source={{
              uri: url.data.startsWith("http")
                ? url.data
                : `${BACKEND_URL}/static${url.data}`,
            }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: 16,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={(e) => {
              if (e.nativeEvent.width > 500 || e.nativeEvent.height > 500) {
                const aspectRatio = e.nativeEvent.width / e.nativeEvent.height;
                if (aspectRatio > 1) {
                  setImageSize({
                    width: 500,
                    height: 500 / aspectRatio,
                  });
                }
                if (aspectRatio < 1) {
                  setImageSize({
                    width: 500 * aspectRatio,
                    height: 500,
                  });
                }
              } else {
                setImageSize({
                  width: e.nativeEvent.width,
                  height: e.nativeEvent.height,
                });
              }
              setIsLoading(false);
            }}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </>
      ) : (
        <Image
          source={url.data as ImageSourcePropType}
          style={{ resizeMode: "contain" }}
          className={`${editable ? "border-2 border-design-primary" : ""}`}
        />
      )}
    </Pressable>
  );
}
