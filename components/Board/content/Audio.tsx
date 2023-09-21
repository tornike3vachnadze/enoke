import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { AudioStyleParams, BoardData } from "../../../types";
import { AVPlaybackSource, Audio } from "expo-av";

export default function AudioContent({
  index,
  setBoardData,
  url,
  style,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  url: {
    type: "audio";
    data: string;
  };
  style: AudioStyleParams;
}) {
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<any>(null);
  const [status, setStatus] = useState<any>({});
  const [caption, setCaption] = useState("");

  const [localSound, setLocalSound] = useState<any>(null);

  const [sound, setSound] = useState<any>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recording.setOnRecordingStatusUpdate((status: any) => {
        setStatus(status);
      });
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (shouldSave = true) => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    if (uri && shouldSave) {
      setBoardData((prev) => {
        const newBoardData = [...prev];
        newBoardData[index].content.data = uri;
        return newBoardData;
      });
    }
  };

  const playSound = async (url: string, type: "network" | "local") => {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: url as string,
      },
      {
        shouldPlay: true,
      }
    );
    sound.setOnPlaybackStatusUpdate((status: any) => {
      setStatus(status);
      status.didJustFinish && sound.stopAsync();
    });
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    // setBoardData((prev) => {
    //   const newBoardData = [...prev];
    //   newBoardData[index].content = "Pending impl";
    //   return newBoardData;
    // });
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Pressable className={``}>
      {url.type === "audio" && (
        <>
          {!url.data ? (
            <View className="bg-white  rounded-xl  shadow">
              {style?.showCaption ? (
                <TextInput
                  placeholder={style.caption ? "" : "Please type here"}
                  onChangeText={(e) => {
                    setCaption(e);
                    style.caption = e;
                  }}
                  style={{ marginLeft: 10, marginTop: 10 }}
                >
                  {style?.caption}
                </TextInput>
              ) : null}

              <View className="bg-white  rounded-xl py-2.5 px-4 w-72 flex flex-row justify-between items-center">
                <View className="flex flex-row items-center space-x-3">
                  <View
                    className={`rounded-full w-3 h-3 ${
                      isRecording ? "bg-red-600" : "bg-slate-300"
                    }`}
                  ></View>
                  <Text className="text-base font-medium font-satoshi-medium">
                    {status.durationMillis
                      ? `${
                          Math.floor(
                            status.durationMillis / 1000 / 60
                          ).toString().length === 1
                            ? "0" +
                              Math.floor(status.durationMillis / 1000 / 60)
                            : Math.floor(status.durationMillis / 1000 / 60)
                        }:${
                          (
                            Math.floor(status.durationMillis / 1000) % 60
                          ).toString().length === 1
                            ? "0" +
                              (Math.floor(status.durationMillis / 1000) % 60)
                            : Math.floor(status.durationMillis / 1000) % 60
                        }`
                      : "00:00"}
                  </Text>
                </View>
                <View className="flex flex-row items-center space-x-3">
                  {isRecording && (
                    <Pressable
                      className="rounded-full bg-red-200 p-2 w-8 h-8 flex items-center justify-center"
                      onPress={() => {
                        setIsRecording(false);
                        stopRecording(false);
                      }}
                    >
                      <Image
                        source={require("../../../assets/icons/minus.png")}
                      />
                    </Pressable>
                  )}
                  <Pressable
                    className="rounded-full bg-design-primary p-2 w-8 h-8 flex items-center justify-center"
                    style={{
                      transform: [
                        {
                          scale: isRecording ? 1.3 : 1,
                        },
                      ],
                    }}
                    onPress={() => {
                      if (!isRecording) {
                        setIsRecording(true);
                        startRecording();
                      } else {
                        setIsRecording(false);
                        stopRecording();
                      }
                    }}
                  >
                    <Image
                      source={require("../../../assets/icons/voice2.png")}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <View className="bg-white shadow rounded-xl py-2.5 px-4 w-72 flex flex-row justify-between items-center">
              <View className="flex flex-row items-center space-x-3">
                <Pressable
                  className="rounded-full bg-red-200 p-2 px-6 h-8 flex items-center justify-center"
                  onPress={async () => {
                    if (!sound) {
                      playSound(
                        url.data,
                        url.data.includes("file://") ? "local" : "network"
                      );
                    } else {
                      if (status.isPlaying) {
                        await sound.pauseAsync();
                      } else {
                        await sound.playAsync();
                      }
                    }
                  }}
                >
                  <Text>{!status.isPlaying ? "Play" : "Pause"}</Text>
                </Pressable>
                <Text className="text-base font-medium font-satoshi-medium">
                  {status.isLoaded &&
                    `${
                      Math.floor(status.positionMillis / 1000 / 60).toString()
                        .length === 1
                        ? "0" + Math.floor(status.positionMillis / 1000 / 60)
                        : Math.floor(status.positionMillis / 1000 / 60)
                    }:${
                      (Math.floor(status.positionMillis / 1000) % 60).toString()
                        .length === 1
                        ? "0" + (Math.floor(status.positionMillis / 1000) % 60)
                        : Math.floor(status.positionMillis / 1000) % 60
                    } / ${
                      Math.floor(status.durationMillis / 1000 / 60).toString()
                        .length === 1
                        ? "0" + Math.floor(status.durationMillis / 1000 / 60)
                        : Math.floor(status.durationMillis / 1000 / 60)
                    }:${
                      (Math.floor(status.durationMillis / 1000) % 60).toString()
                        .length === 1
                        ? "0" + (Math.floor(status.durationMillis / 1000) % 60)
                        : Math.floor(status.durationMillis / 1000) % 60
                    }`}
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}
