import { LinearGradient } from "expo-linear-gradient";
import { Slot, usePathname, useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import ArrowL from "../../../assets/icons/arrow-l.svg";
import { useAuth } from "../../../hooks";

export default function UserPageLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { localUser } = useAuth();

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex flex-row justify-between items-center w-full px-6 py-4">
          <Pressable
            className="flex-1"
            onPress={() => {
              router.back();
            }}
          >
            <ArrowL />
          </Pressable>
          <Text className="flex-1 text-center font-bold font-satoshi-bold text-xl">
            {localUser?.username || "@user"}
          </Text>
          <View className="flex-1"></View>
        </View>
        <View className="pt-3 pb-6 px-12">
          <View className="flex flex-row justify-between items-center shadow-lg py-3 px-4 bg-white rounded-3xl">
            <View className="flex flex-row justify-start items-center space-x-2">
              <View className="w-10 h-10 bg-design-primary rounded-full"></View>
              <View>
                <Text className="font-medium font-satoshi-medium text-design-text text-sm">
                  Invite friends to Enok
                </Text>
                <Text className="font-normal font-satoshi-regular text-design-gray-4 text-xs">
                  enok.com/{localUser?.username || "user"}
                </Text>
              </View>
            </View>
            <View>
              <Image source={require("../../../assets/icons/link.png")} />
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center w-full px-6 pt-4">
          <View className="flex-1 flex flex-row justify-start items-center">
            <Pressable
              className={`border-b self-start px-3 pb-3 ${
                pathname.includes("/suggested")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/profile/page/suggested")}
            >
              <Text
                className={`text-left ${
                  pathname.includes("/suggested")
                    ? "font-bold font-satoshi-bold"
                    : "font-normal font-satoshi-regular"
                } text-base`}
              >
                Suggested
              </Text>
            </Pressable>
          </View>
          <View className="flex-1 flex flex-row justify-center items-center">
            <Pressable
              className={`border-b self-start px-3 pb-3 ${
                pathname.includes("/followers")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/profile/page/followers")}
            >
              <Text
                className={`text-left ${
                  pathname.includes("/followers")
                    ? "font-bold font-satoshi-bold"
                    : "font-normal font-satoshi-regular"
                } text-base`}
              >
                Followers
              </Text>
            </Pressable>
          </View>
          <View className="flex-1  flex flex-row justify-end items-center">
            <Pressable
              className={`border-b self-start px-3 pb-3 ${
                pathname.includes("/following")
                  ? "border-b-design-secondary"
                  : "border-b-transparent"
              }`}
              onPress={() => router.push("/profile/page/following")}
            >
              <Text
                className={`text-left ${
                  pathname.includes("/following")
                    ? "font-bold font-satoshi-bold"
                    : "font-normal font-satoshi-regular"
                } text-base`}
              >
                Following
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
