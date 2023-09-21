import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { BoardData, UrlStyleParams } from "../../../types";
import { getMetadataFromURL } from "../../../utils";

export default function UrlContent({
  index,
  setBoardData,
  url,
  style,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  url: {
    type: "url";
    data: string;
  };
  style: UrlStyleParams;
}) {
  //   const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  } | null>(null);
  const [text, setText] = useState("");

  const setUrl = (url: string) => {
    if (!url) return;
    if (url.startsWith("http://")) {
      url = url.replace("http://", "https://");
    }
    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }
    setBoardData((prev) => {
      const newBoardData = [...prev];
      newBoardData[index].content.data = url;
      return newBoardData;
    });
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const metadata = await getMetadataFromURL(url.data);
        metadata ? setMetadata(metadata) : setHasError(true);
      } catch (error) {
        // console.log("error", error);
        setHasError(true);
      }
      setIsLoading(false);
    };
    url.data && getData();
  }, [url.data]);

  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      onLongPress={() => {
        if (!url.data) {
          inputRef.current?.focus();
        }
      }}
    >
      {url.type === "url" && (
        <>
          <View className="bg-white shadow rounded-xl py-4 px-4 w-72 flex flex-row justify-between items-center">
            {!url.data && (
              <View className="flex flex-row justify-start items-center space-x-1">
                <Text className="text-design-primary font-bold font-satoshi-bold">
                  Link:
                </Text>
                <TextInput
                  ref={inputRef}
                  keyboardType="url"
                  value={text}
                  onChangeText={setText}
                  autoFocus
                  onBlur={() => setUrl(text.toLowerCase())}
                  className="font-medium font-satoshi-medium"
                />
              </View>
            )}
            {url.data && (
              <>
                {isLoading && (
                  <View className="w-full flex justify-center items-center">
                    <ActivityIndicator />
                  </View>
                )}
                {!isLoading && (
                  <View className="w-full flex justify-center items-start space-y-2">
                    {hasError && (
                      <Text className="font-bold text-red-400 text-sm font-satoshi-bold">
                        Error Loading Metadata
                      </Text>
                    )}
                    {metadata?.image && style?.preview && (
                      <Image
                        source={{ uri: metadata.image }}
                        className="w-full h-32 rounded-xl border"
                        style={{
                          resizeMode: "cover",
                          borderColor: "#E5E5E5",
                        }}
                      />
                    )}
                    {metadata?.title && style?.caption && (
                      <Text className="font-bold text-base font-satoshi-bold">
                        {metadata.title}
                      </Text>
                    )}
                    {metadata?.description && style?.caption && (
                      <Text className="font-medium font-satoshi-medium text-sm text-design-text">
                        {metadata.description.length > 100
                          ? (metadata.description =
                              metadata.description.slice(0, 100) + "...")
                          : metadata.description}
                      </Text>
                    )}
                    {url.data && (
                      <Text className="font-medium font-satoshi-medium text-xs text-design-gray">
                        {url.data.length > 50
                          ? (url.data = url.data.slice(0, 50) + "...")
                          : url.data}
                      </Text>
                    )}
                  </View>
                )}
              </>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
}
