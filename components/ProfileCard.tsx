import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useUserServer } from "../hooks/server/useUserServer";
import {
  UserDataServerType,
  UserProfileServerType,
  UserServerType,
} from "server/routes/users";

export default function ProfileCard({
  style,
  username,
}: {
  style?: any;
  username: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<
    (UserServerType & UserProfileServerType & UserDataServerType) | null
  >(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { getUserByUserName } = useUserServer();

  useEffect(() => {
    (async () => {
      const user = await getUserByUserName(username);
      user.data?.user && setData(user.data?.user);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <View>
      <View
        className={`flex flex-row overflow-hidden rounded-2xl`}
        style={[
          style,
          {
            opacity: isLoaded ? 1 : 0.5,
          },
        ]}
      >
        <View className="flex-1 bg-design-gray-2 aspect-square"></View>
        <View className="flex-1 bg-white px-4 py-3 relative justify-between">
          <Pressable onPress={() => router.push("/profile/page/suggested")}>
            <Text className="font-bold font-satoshi-bold text-lg">
              {data?.name || data?.username}
            </Text>
          </Pressable>
          <Pressable className="absolute right-4 top-4 transform scale-150">
            <Image source={require("../assets/icons/smile.png")} />
          </Pressable>
          <Pressable
            className="absolute right-4 bottom-4 transform scale-125 z-50"
            onPress={() => router.push("/settings/profile")}
          >
            <Image source={require("../assets/icons/more.png")} />
          </Pressable>
          {data?.followers ? (
            <Text className="font-light font-satoshi-light text-sm">
              {data?.followers.length}{" "}
              {data?.followers.length === 1 ? "follower" : "followers"}
            </Text>
          ) : (
            <Text className="font-light font-satoshi-light text-sm">
              {isLoaded ? "0 followers" : "Loading..."}
            </Text>
          )}
        </View>
      </View>
      {!isLoaded && (
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "75%",
            transform: [{ translateX: -20 }, { translateY: -10 }],
          }}
        >
          <ActivityIndicator color="#6C68A8" />
        </View>
      )}
    </View>
  );
}
