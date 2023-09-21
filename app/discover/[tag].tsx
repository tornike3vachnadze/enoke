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
import { SimpleGrid } from "react-native-super-grid";
import ArrowL from "../../assets/icons/arrow-l.svg";

export default function DiscoverTag() {
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
          <View className="w-full mt-2 px-6 flex flex-row justify-between items-center z-50">
            <View className="flex flex-row justify-start items-center space-x-6">
              <Pressable onPress={() => router.back()}>
                <ArrowL />
              </Pressable>
            </View>
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
            <Text className="text-lg mt-6 font-medium font-satoshi-medium text-design-text">
              #anewageforsocial
            </Text>
            <View
              className="mt-4"
              style={{
                margin: -20,
              }}
            >
              <SimpleGrid
                itemDimension={130}
                listKey={(i: any) => i.id}
                spacing={20}
                data={[
                  {
                    id: "1",
                    image: require("../../assets/extras/basecamp.png"),
                    reactions: [
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ],
                    locked: true,
                    title: "The 100 year club",
                    user: "@Vollebak",
                  },
                  {
                    id: "2",
                    image: require("../../assets/extras/basecamp.png"),
                    reactions: [
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ],
                    locked: false,
                    title: "The 100 year club",
                    user: "@Vollebak",
                  },
                  {
                    id: "3",
                    image: require("../../assets/extras/basecamp.png"),
                    reactions: [
                      { emoji: "🙌🏼", count: 12_000 },
                      { emoji: "🔥", count: 1_000 },
                      { emoji: "🤩", count: 100 },
                    ],
                    locked: false,
                    title: "The 100 year club",
                    user: "@Vollebak",
                  },
                ]}
                renderItem={(i) => (
                  <BoardCard.Small2
                    image={i.item.image}
                    reactions={i.item.reactions}
                    locked={i.item.locked}
                    title={i.item.title}
                    user={i.item.user}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
