import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../../hooks";
import ArrowL from "../../assets/icons/arrow-l.svg";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Board from "../../components/Board";
import { profileBoardData } from "../../data/placeholder";
import { useEffect, useState } from "react";
import { useBoardServer } from "../../hooks/server/useBoardServer";

export default function Profile() {
  const { localUser } = useAuth();
  const router = useRouter();

  const { getUsersProfileBoard } = useBoardServer();

  const [boardId, setBoardId] = useState<string>("");
  const [profileBoardData, setProfileBoardData] = useState<any[]>([]);

  useEffect(() => {
    if (localUser && !boardId) {
      (async () => {
        const profileBoard = await getUsersProfileBoard(localUser.username);

        if (profileBoard.success) {
          profileBoard.data?.board?.board_data &&
            setProfileBoardData(
              JSON.parse(profileBoard.data?.board?.board_data)
            );
          profileBoard.data?.board?.id &&
            setBoardId(profileBoard.data?.board.id);
        }
      })();
    }
  }, [localUser, boardId]);

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 relative">
        <View className="relative">
          <View className="w-full mt-4 px-6 flex flex-row justify-between items-center z-50">
            <View className="flex flex-row justify-start items-center">
              <Pressable
                className="transform scale-90"
                onPress={() => router.push("/")}
              >
                <ArrowL />
              </Pressable>
              <Text className="ml-6 font-light text-lg font-satoshi-light">
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
                <Text className="font-bold text-lg font-satoshi-bold">
                  {localUser?.username || "@user"}
                </Text>
              </Pressable>
            </View>
            <View className="flex flex-row justify-start items-center space-x-6">
              <Image source={require("../../assets/icons/search.png")} />
              <Image source={require("../../assets/icons/bell.png")} />
            </View>
          </View>
        </View>
        <View className="flex-1">
          {boardId && <Board id={boardId} data={profileBoardData} />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
