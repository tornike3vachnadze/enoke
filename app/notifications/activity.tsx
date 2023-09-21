import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Activity() {
  const router = useRouter();

  return (
    <View className="flex-1 px-6">
      <ScrollView
        className="space-y-4"
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <View
            className="flex flex-row justify-start items-center space-x-4"
            key={i}
          >
            <View className="w-14 h-14 rounded-full bg-design-primary"></View>
            <View className="flex flex-col justify-between items-start space-y-1">
              <Text className="text-design-text font-medium font-satoshi-medium text-base">
                Activity Name
              </Text>
              <Text className="text-design-gray-8 font-medium font-satoshi-medium text-xs">
                Time
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
