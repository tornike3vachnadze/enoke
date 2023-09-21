import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../hooks";
import { useRouter } from "expo-router";
import Board from "./Board";
import { useBoardServer } from "../hooks/server/useBoardServer";
import { useEffect, useState } from "react";

export default function Home() {
  const { localUser } = useAuth();
  const router = useRouter();
  const { getUsersHomeBoard } = useBoardServer();

  const [boardId, setBoardId] = useState<string>("");
  const [homeBoardData, setHomeBoardData] = useState<any[]>([]);
  const [boardCoordinates, setBoardCoordinates] = useState<{
    x: number;
    y: number;
  } | null>({ x: 0, y: 0 });

  useEffect(() => {
    if (localUser && !boardId) {
      (async () => {
        const homeBoard = await getUsersHomeBoard(localUser.username);

        if (homeBoard.success) {
          homeBoard.data?.board?.board_data &&
            setHomeBoardData(JSON.parse(homeBoard.data?.board?.board_data));
          homeBoard.data?.board?.id && setBoardId(homeBoard.data?.board.id);
        }
      })();
    }
  }, [localUser, boardId]);

  return (
    <SafeAreaView
      className="flex-1 relative"
      style={{
        opacity: !localUser ? 0 : 1,
      }}
      pointerEvents={!localUser ? "none" : "auto"}
    >
      <View className="relative">
        <View className="w-full mt-4 px-6 flex flex-row justify-between items-center z-50">
          <View className="flex flex-row justify-start items-center">
            {/* <Pressable className="transform scale-90">
              <ArrowL />
            </Pressable> */}
            <Text className="ml-2 font-bold text-lg font-satoshi-bold">
              Home
            </Text>
            <Text className="ml-3 font-medium text-lg font-satoshi-medium">
              /
            </Text>
            <Pressable
              onPress={() => {
                router.push("/profile");
              }}
              className="ml-3"
            >
              <Text className="font-light text-lg font-satoshi-light">
                {localUser?.username || "@user"}
              </Text>
            </Pressable>
          </View>
          <View className="flex flex-row justify-start items-center space-x-6">
            <Pressable onPress={() => router.push("/search")}>
              <Image source={require("../assets/icons/search.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/notifications/activity")}>
              <Image source={require("../assets/icons/bell.png")} />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        className="flex-1 overflow-hidden"
        onLayout={({ nativeEvent: { layout } }) => {
          console.log("board", layout);
          setBoardCoordinates({ x: layout.x, y: layout.y });
        }}
      >
        {boardId && (
          <Board
            id={boardId}
            data={homeBoardData}
            boardCoordinate={boardCoordinates}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
