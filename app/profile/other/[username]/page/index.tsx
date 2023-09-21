import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Smile from "../../../../../assets/icons/smile.svg";
import ArrowL from "../../../../../assets/icons/arrow-l.svg";
import { usePathname, useRouter, useSearchParams } from "expo-router";
import { useAuth } from "../../../../../hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function OtherUsersPage() {
  const router = useRouter();
  const { localUser } = useAuth();
  const { username } = useSearchParams();

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
            @{username || "user"}
          </Text>
          <View className="flex-1"></View>
        </View>
        <View className="pt-3 pb-6 px-12">
          <View className="flex flex-row justify-between items-center shadow-lg py-3 px-4 bg-white rounded-3xl">
            <View className="flex flex-row justify-start items-center space-x-2">
              <View className="w-10 h-10 bg-design-primary rounded-full"></View>
              <View>
                <Text className="font-medium font-satoshi-medium text-design-text text-sm">
                  Share {username || "user"}'s Page
                </Text>
                <Text className="font-normal font-satoshi-regular text-design-gray-4 text-xs">
                  enok.com/{username || "user"}
                </Text>
              </View>
            </View>
            <View>
              <Image source={require("../../../../../assets/icons/link.png")} />
            </View>
          </View>
        </View>
        <View className="flex-1">
          <View className="py-6">
            <Text className="font-bold font-satoshi-bold px-6">Mutual</Text>
            <View className="mt-2">
              <FlatList
                data={[
                  {
                    username: "Username",
                    title: "Pixel Strategist",
                    emoji: "👋",
                  },
                  {
                    username: "Username",
                    title: "Pixel Strategist",
                  },
                ]}
                renderItem={({ item }) => (
                  <View
                    className="flex flex-row justify-start items-center space-x-4 py-2.5 px-6 border-b border-b-design-gray-3"
                    key={item.username}
                  >
                    <View className="flex-1 flex flex-row justify-start items-center space-x-2">
                      <View className="w-10 h-10 bg-design-primary rounded-full"></View>
                      <View>
                        <Text className="font-satoshi-regular font-normal text-base text-design-text">
                          {item.username}
                        </Text>
                        <Text className="font-satoshi-regular font-normal text-design-gray-6">
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    {item.emoji ? (
                      <Text className="text-xl">{item.emoji}</Text>
                    ) : (
                      <Smile />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
          <View className="">
            <Text className="font-bold font-satoshi-bold px-6">
              Suggestions
            </Text>
            <View className="mt-2">
              <FlatList
                data={[
                  {
                    username: "Username",
                    title: "Pixel Strategist",
                    emoji: "👋",
                  },
                  {
                    username: "Username",
                    title: "Pixel Strategist",
                  },
                ]}
                renderItem={({ item }) => (
                  <View
                    className="flex flex-row justify-start items-center space-x-4 py-2.5 px-6 border-b border-b-design-gray-3"
                    key={item.username}
                  >
                    <View className="flex-1 flex flex-row justify-start items-center space-x-2">
                      <View className="w-10 h-10 bg-design-primary rounded-full"></View>
                      <View>
                        <Text className="font-satoshi-regular font-normal text-base text-design-text">
                          {item.username}
                        </Text>
                        <Text className="font-satoshi-regular font-normal text-design-gray-6">
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    {item.emoji ? (
                      <Text className="text-xl">{item.emoji}</Text>
                    ) : (
                      <Smile />
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
