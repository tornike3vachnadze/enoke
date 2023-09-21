import { useRouter } from "expo-router";
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

export default function Discover() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 64,
          }}
        >
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
          <View className="flex-1 px-6">
            <Text className="text-xl font-satoshi-regular">What's new</Text>
            <View className="mt-4">
              <BoardCard.Large
                image={require("../../assets/extras/basecamp.png")}
                reactions={[
                  { emoji: "🙌🏼", count: 12_000 },
                  { emoji: "🔥", count: 1_000 },
                  { emoji: "🤩", count: 100 },
                ]}
                locked
              />
            </View>
            <View className="mt-4 flex flex-col space-y-6">
              <View>
                <Pressable
                  onPress={() => router.push("/discover/anewageforsocial")}
                >
                  <Text className="text-lg font-medium font-satoshi-medium text-design-text">
                    #anewageforsocial
                  </Text>
                </Pressable>
                <ScrollView
                  horizontal
                  className="mt-4"
                  contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                </ScrollView>
              </View>
              <View>
                <Pressable
                  onPress={() => router.push("/discover/anewageforsocial")}
                >
                  <Text className="text-lg font-medium font-satoshi-medium text-design-text">
                    #anewageforsocial
                  </Text>
                </Pressable>
                <ScrollView
                  horizontal
                  className="mt-4"
                  contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                </ScrollView>
              </View>
              <View>
                <Pressable
                  onPress={() => router.push("/discover/anewageforsocial")}
                >
                  <Text className="text-lg font-medium font-satoshi-medium text-design-text">
                    #anewageforsocial
                  </Text>
                </Pressable>
                <ScrollView
                  horizontal
                  className="mt-4"
                  contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                  <BoardCard.Small
                    image={require("../../assets/extras/basecamp.png")}
                    reactions={[
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ]}
                    locked
                    title="The 100 year club"
                    user="@Vollebak"
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
