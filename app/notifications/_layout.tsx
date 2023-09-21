import { Slot, usePathname, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Pressable,
} from "react-native";
import BoardCard from "../../components/Discover/BoardCard";

export default function NotificationsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="w-full mt-2 px-6 flex flex-row justify-end items-center z-50">
          <View className="flex flex-row justify-start items-center space-x-6">
            <Pressable onPress={() => router.push("/search")}>
              <Image source={require("../../assets/icons/search.png")} />
            </Pressable>
            <Pressable onPress={() => router.push("/notifications/activity")}>
              <Image source={require("../../assets/icons/bell.png")} />
            </Pressable>
          </View>
        </View>
        <View className="px-6 mt-2 flex flex-row justify-start items-center space-x-6 border-b pb-2 border-b-design-gray-3">
          <Pressable
            onPress={() => router.push("/notifications/activity")}
            className={`border-b ${
              pathname.includes("activity")
                ? "border-b-design-text"
                : "border-b-transparent"
            }`}
          >
            <Text
              className={`text-lg text-design-text ${
                pathname.includes("activity")
                  ? "font-bold font-satoshi-bold"
                  : "font-normal font-satoshi-regular"
              }`}
            >
              Activity
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/notifications/requests")}
            className={`border-b ${
              pathname.includes("requests")
                ? "border-b-design-text"
                : "border-b-transparent"
            }`}
          >
            <Text
              className={`text-lg text-design-text ${
                pathname.includes("requests")
                  ? "font-bold font-satoshi-bold"
                  : "font-normal font-satoshi-regular"
              }`}
            >
              Requests
            </Text>
          </Pressable>
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
