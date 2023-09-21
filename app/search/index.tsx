import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, SafeAreaView, Text, TextInput } from "react-native";
import ArrowL from "../../assets/icons/arrow-l.svg";
import { View } from "react-native";
import { useState } from "react";

export default function Search() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [type, setType] = useState<"all" | "keywords" | "members" | "boards">(
    "all"
  );

  return (
    <LinearGradient
      colors={["#F8F9FB", "#DAD9E9"]}
      locations={[0.32, 1]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="px-6 pt-2 pb-6 flex flex-row space-x-4 justify-between items-center">
          <Pressable onPress={() => router.back()}>
            <ArrowL />
          </Pressable>
          <TextInput
            className="flex-1 bg-design-gray-5 rounded-full font-satoshi-medium text-base pb-3.5 pt-1.5 px-6"
            placeholder="Start Typing..."
            placeholderTextColor="#6D6D70"
            keyboardType="default"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        {search.length > 0 && (
          <View>
            <View className="px-6 flex flex-row justify-between items-center">
              <Pressable
                className={`flex justify-center items-center border-b border-b-transparent px-4 pb-1
                ${type === "all" ? "border-b-design-gray-8" : ""}
              `}
                onPress={() => setType("all")}
              >
                <Text className="font-medium font-satoshi-medium text-base">
                  All
                </Text>
              </Pressable>
              <Pressable
                className={`flex justify-center items-center border-b border-b-transparent px-4 pb-1
                ${type === "keywords" ? "border-b-design-gray-8" : ""}
              `}
                onPress={() => setType("keywords")}
              >
                <Text className="font-medium font-satoshi-medium text-base">
                  Keywords
                </Text>
              </Pressable>
              <Pressable
                className={`flex justify-center items-center border-b border-b-transparent px-4 pb-1
                ${type === "members" ? "border-b-design-gray-8" : ""}
              `}
                onPress={() => setType("members")}
              >
                <Text className="font-medium font-satoshi-medium text-base">
                  Members
                </Text>
              </Pressable>
              <Pressable
                className={`flex justify-center items-center border-b border-b-transparent px-4 pb-1
                ${type === "boards" ? "border-b-design-gray-8" : ""}
              `}
                onPress={() => setType("boards")}
              >
                <Text className="font-medium font-satoshi-medium text-base">
                  Boards
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
