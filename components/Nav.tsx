import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";

function NavBottom() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#ffffff", "#ffffff72"]} locations={[0.6, 1]}>
      <View className="pt-4 px-4 pb-8 flex flex-row justify-between items-center">
        <Pressable
          onPress={() => router.push("/discover")}
          className="p-2 flex-1 flex flex-col justify-center items-center text-center font-medium font-satoshi-medium text-xxs"
        >
          <Image source={require("../assets/icons/globe.png")} />
          <Text className="mt-2">Discover</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/chat/lobby")}
          className="p-2 flex-1 flex flex-col justify-center items-center text-center font-medium font-satoshi-medium text-xxs"
        >
          <Image source={require("../assets/icons/message.png")} />
          <Text className="mt-2">Messages</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/")}
          className="p-2 flex-1 flex flex-col justify-center items-center text-center font-medium font-satoshi-medium text-xxs"
        >
          <Image source={require("../assets/icons/enok.png")} />
          <Text className="mt-2">Home</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const Nav = {
  Bottom: NavBottom,
};

export default Nav;
